#! /usr/bin/env python3.7
import sys
import os
import signal
import re
import platform
import webbrowser
import time
#from crontab import CronTab
import subprocess
import json
import optparse

realPath = os.getcwd()

print("PARSING PARAMETERS...")
parser = optparse.OptionParser()
parser.add_option('-d', '--dev', action="store_true", help="Run in dev mode", default=False)
(parameteres, args) = parser.parse_args()
print("PARAMETERS PARSED!")

#lettura dei parametri
try:
    print("OPENING CONF FILE IN "+realPath+"/data/copeapp.conf...")
    config = open(realPath+'/data/copeapp.conf', 'r')
    print("CONF FILE OPENED")
except FileNotFoundError:
    print('CONF FILE NOT FOUND! CREATING ONE WITH DEFAULT CONFIGURATION...')
    config = open(realPath+'/data/copeapp.conf', 'w')
    configFile = []
    configFile.append("# nginx config\n")
    configFile.append("lbAlgorithm: least_conn\n")
    configFile.append("workerProcesses: auto\n")
    configFile.append("workerConnections: 1024\n")
    configFile.append("keepAliveTimeout: 65\n")
    configFile.append("serverName: localhost\n")
    configFile.append("listenOn: 8023\n")
    configFile.append("monitorAddress: /monitor\n")
    configFile.append("# cluster config\n")
    configFile.append("nodesNumber: 2\n")
    configFile.append("minNodes: 2\n")
    configFile.append("maxNodes: 4\n")
    configFile.append("startingPort: 3000\n")
    configFile.append("devPort: 8023\n")
    configFile.append("checkRateMinutes: 3\n")
    configFile.append("# database config\n")
    configFile.append("dbhost: localhost\n")
    configFile.append("dbport: 666\n")
    config.writelines(configFile)
    config.close()
    config = open(realPath+'data/copeapp.conf', 'r')
    print('CONF FILE CREATED AND OPENED!')

#lettura file di conf della app
print('READING CONF FILE...')
options = {}
for line in config.readlines() :
    comment = re.match(r'(\t*#|\s*#)', line)
    blank = re.match(r'(\t*\n|\s*\n)', line)
    if comment is None and blank is None:
        options[line.split(": ")[0]] = line.split(": ")[1].strip("\n")
config.close();

if int(options.get("maxNodes", 4))+int(options.get("startingPort", 3000))-1 > int(options.get("listen", 8080)) or int(options.get("listen", 8080)) < int(options.get("startingPort", 3000)) :
    sys.exit("The port assigned to the nginx server is equal to a port assignable to a node")

print('DONE!')

if not parameteres.dev:
    print('READING NGINX.CONF FILE...')
    #letture al file di configurazione di nginx
    if platform.system() == "Windows":
        configPath = "nginx/conf/"
    elif platform.system() == "Linux":
        configPath = "/etc/nginx/"
    else:
        sys.exit("OS not yet supported")

    nginx = open(configPath+"nginx.conf", "r")
    nginxConf = []
    for line in nginx.readlines() :
        server = re.match(r'\s*\bserver\s*(\w*|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\:\d{1,4}\;\n', line)
        comment = re.match(r'(\t*#|\s*#)', line)
        blank = re.match(r'(\t*\n|\s*\n)', line)
        algorithm = re.match(r'\t*\s*(\b(least_conn)|\b(ip_hash)|\b(least_time));', line)
        if server is None and comment is None and blank is None and algorithm is None:
            nginxConf.append(line)
    nginx.close()
    print('CONF FILE READ!')

    #cancellazione file log su windows
    if platform.system() == "Windows":
        print('REMOVING LOG FILES...')
        try:
            os.remove("nginx/logs/access.log")
            os.remove("nginx/logs/error.conf")
            os.remove("nginx/logs/nginx.pid")
        except OSError:
            pass
        print('REMOVED!')

    print('MODIFIYNG NGINX CONF FILE...')
    if platform.system() == "Windows":
        nginx = open(configPath+"copeapp.conf", "w")
    elif platform.system() == "Linux":
        os.remove(configPath+"nginx.conf")
        nginx = open(configPath+"nginx.conf", "w+")
    else:
        sys.exit("OS not yet supported")
    for line in nginxConf :
        if line.find("worker_processes") != -1: #modifica proprieta workerProcesses: worker_processes
            line = re.sub(r'\b(worker_processes)\s*\d{1,2};', "worker_processes "+options.get("workerProcesses", "auto")+";", line)
        if line.find("worker_connections") != -1: #modifica proprieta workerProcesses: worker_processes
            line = re.sub(r'\b(worker_connections)\s*\d{1,5};', "worker_connections "+options.get("workerConnections", "1024")+";", line)
        if line.find("keepalive_timeout") != -1: #modifica proprieta workerProcesses: worker_processes
            line = re.sub(r'\b(keepalive_timeout)\s*\d{1,3};', "keepalive_timeout "+options.get("keepaliveTimeout", "65")+";", line)
        if line.find("server_name") != -1: #modifica proprieta workerProcesses: worker_processes
            line = re.sub(r'\b(server_name)\s*\w*;', "\t\tserver_name "+options.get("serverName", "localhost")+";", line)
        if line.find("listen") != -1: #modifica proprieta listen: listen
            line = re.sub(r'\b(listen)\s*\d*;', "listen "+options.get("listen", "8080")+";", line)
        if line.find("location") != -1: #modifica proprieta monitorAddress: location
            line = re.sub(r'\s*\t*location\s*/\w{1,}\s*{', "\t\tlocation "+options.get("monitorAddress", "/monitor")+" {", line)
        nginx.write(line)

        serverSegment = re.match(r'\s*\bupstream\s*\w*\s*{', line)
        if serverSegment is not None :
            nginx.write("\t\t"+options.get("lbAlgorithm", "least_conn")+";\n")
            for x in range(0, int(options.get("nodesNumber", 2))) :
                nginx.write("\t\tserver localhost:"+str(int(options.get("startingPort", "3000"))+x)+";\n")

    nginx.close()
    print('MODIFIED!')

    print('STARTING NODE...')
    if platform.system() == "Windows":
        dbhost = options.get("dbhost", "localhost")
        dbport = options.get("dbport", "666")
        for x in range(int(options.get("nodesNumber", 2))):
            port = str(int(options.get("startingPort", 3000))+x)
            print("executing command: node app -p "+port+" --dbhost "+dbhost+":"+dbport)
            node = subprocess.Popen(['start', 'node', 'app', '-p', port, "--dbhost", dbhost+":"+dbport], shell=True)

    elif platform.system() == "Linux":
        dbhost = options.get("dbhost", "localhost")
        dbport = options.get("dbport", "666")
        for x in range(int(options.get("nodesNumber", 2))):
            port = str(int(options.get("startingPort", 3000))+x)
            print("executing command: node app -p "+port+" --dbhost "+dbhost+":"+dbport)
            node = subprocess.Popen(['start', 'node', 'app', '-p', port, "--dbhost", dbhost+":"+dbport], shell=True)

        #cronCode = "daemonProcess.py " + str(int(options.get("startingPort", 3000))+x)

        #cron =  CronTab(user = True)
        #job = cron.new(command="./daemonProcess.py")
        #job.hour.every(int(options.get("checkRateHours", "4")))

    else:
        sys.exit("OS not yet supported")
    print('NODE STARTED!')
else:
    print('STARTING NODE...')
    port = str(int(options.get("devPort", "8023")))
    dbhost = options.get("dbhost", "localhost")
    dbport = options.get("dbport", "666")
    print('executing command: forever start -p "'+realPath+'/data/logs/" "'+realPath+'/app.js" -p '+port+' --dev --dbhost '+dbhost+':'+dbport)
    #os.spawnl(os.P_DETACH, "node app -p "+port+" --dev --dbhost "+dbhost+":"+dbport+" &")
    #subprocess.call(["node", "app", "-p", port, "--dev", "--dbhost", dbhost+":"+dbport, "&"], shell=True)
    #subprocess.call(["forever", "start", "-l", "./data/logs/"+port+".log", "-o", "./data/logs/"+port+".out", "-e", "./data/logs/"+port+".err", "-p", "./data/forever/", "app.js", "-p", port, "--dev", "--dbhost", dbhost+":"+dbport], shell=True)
    subprocess.Popen('forever start -p "'+realPath+'/data/logs/" "'+realPath+'/app.js" -p '+port+' --dev --dbhost '+dbhost+':'+dbport, shell=True)
    print('NODE STARTED!')
