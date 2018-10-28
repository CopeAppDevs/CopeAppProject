#! /usr/bin/env python3.7
import os
import re
import sys
import optparse
import subprocess
import platform

print("FINDING PATH...")
realPath = os.path.dirname(os.path.abspath(__file__))
print("PATH CALCULATED TO BE "+realPath)

print("PARSING PARAMETERS...")
parser = optparse.OptionParser()
parser.add_option('-d', '--dev', action="store_true", help="Run in dev mode", default=False)
(parameters, args) = parser.parse_args()
print("PARAMETERS PARSED: "+str(parameters))

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
    configFile.append("startingPort: 8000\n")
    configFile.append("devPort: 8023\n")
    configFile.append("checkRateHours: 3\n")
    configFile.append("# database config\n")
    configFile.append("dbHost: localhost\n")
    configFile.append("dbPort: 5423\n")
    config.writelines(configFile)
    config.close()
    config = open(realPath+'data/copeapp.conf', 'r')
    print('CONF FILE CREATED AND OPENED!')

print('READING CONF FILE...')
options = {}
for line in config.readlines() :
    comment = re.match(r'(\t*#|\s*#)', line)
    blank = re.match(r'(\t*\n|\s*\n)', line)
    if comment is None and blank is None:
        options[line.split(": ")[0]] = line.split(": ")[1].strip("\n").strip("\r")
config.close();
if int(options.get("maxNodes", 4))+int(options.get("startingPort", 3000))-1 > int(options.get("listen", 8080)) or int(options.get("listen", 8080)) < int(options.get("startingPort", 3000)) :
    sys.exit("The port assigned to the nginx server is equal to a port assignable to a node")
print('DONE!')

if parameters.dev:
    print("DEVELOPMENT MODE DETECTED")
    print("STARTING NODE...")
    port = options.get("devPort", "8023")
    dbhost = options.get("dbHost", "localhost")
    dbport = options.get("dbPort", "666")
    print("debug: "+port+"; "+dbhost+":"+dbport+";")
    print("executing command: "+"sudo forever start -a -p "+realPath+"/data/dev/ -l devLog.log -e devErr.err -o devOut.out --pidFile "+realPath+"/data/dev/devPID.pid "+realPath+"/app.js -p "+port+" --dbhost "+dbhost+":"+dbport+" --dev")
    subprocess.Popen("sudo forever start -a -p "+realPath+"/data/dev/ -l devLog.log -e devErr.err -o devOut.out --pidFile "+realPath+"/data/dev/devPID.pid "+realPath+"/app.js -p "+port+" --dbhost "+dbhost+":"+dbport+" --dev", shell=True)
    print("NODE STARTED AT localhost:"+port+"!")
else:
    print("BUILD MODE DETECTED")
    print("CONFIGURING NGINX...")
    print("REMOVING OLD CONFIG FILE...")
    oldConfRemoval = subprocess.Popen("sudo rm /etc/nginx/nginx.conf", shell=True)
    oldConfRemoval.wait()
    print("CREATING NEW CONFIG FILE...")
    newConfCreate = subprocess.Popen("sudo touch /etc/nginx/nginx.conf", shell=True)
    newConfCreate.wait()
    newConf = open("/etc/nginx/nginx.conf","w")
    newConf.write(
        "worker_processes " + options.get("workerProcesses", "auto") + ";\n"+
        "events {\n"+
        "    worker_connections " + options.get("workerConnections","1024") + ";\n"+
        "}\n"+
        "http {\n"+
        "    include  mime.types;\n"+
        "    default_type application/octet-stream;\n"+
        "    sendfile on;\n"+
        "    keepalive_timeout "+options.get("keepAliveTimeout", "65")+";\n"+
        "	 upstream NodeJS {\n"+
        "        "+options.get("lbAlgorithm", "least_conn")+";\n"
    )

    for port in range(int(options.get("startingPort", "8000")), int(options.get("startingPort", "8000"))+ int(options.get("nodesNumber", "2"))):
        newConf.write("        server localhost:"+str(port)+";\n")
        dbport = options.get("dbPort", "5423")
        dbhost = options.get("dbHost", "localhost")
        print("executing command: "+"sudo forever start -a -p "+realPath+"/data/logs/ -l "+str(port)+"Log.log -e "+str(port)+"Err.err -o "+str(port)+"Out.out --pidFile "+realPath+"/data/nodesPids/"+str(port)+"PID.pid "+realPath+"/app.js -p "+str(port)+" --dbhost "+dbhost+":"+dbport+" --dev")
        node = subprocess.Popen("sudo forever start -a -p "+realPath+"/data/logs/ -l "+str(port)+"Log.log -e "+str(port)+"Err.err -o "+str(port)+"Out.out --pidFile "+realPath+"/data/nodesPids/"+str(port)+"PID.pid "+realPath+"/app.js -p "+str(port)+" --dbhost "+dbhost+":"+dbport+" --dev", shell=True)
    newConf.write(
        "    }\n"+
        "    server {\n"+
        "        listen "+options.get("listenOn", "8023")+";\n"+
        " 	     server_name " +options.get("serverName", "localhost")+ ";\n"+
        "        location / {\n"+
        "            proxy_pass http://NodeJS/;\n"+
        "        }\n"+
        "        location "+options.get("monitorAddress", "/monitor")+" {\n"+
        "            stub_status;\n"+
        "        }\n"+
        "    }\n"+
        "}\n"
    )
    newConf.close()
    print("NGINX CONFIGURED")
