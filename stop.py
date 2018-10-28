#! /usr/bin/env python3.7
import os
import re
import sys
import optparse
import subprocess
import platform

print("----------> RUNNING STOP.PY <----------")

print("FINDING PATH...")
realPath = os.path.dirname(os.path.abspath(__file__))
print("PATH CALCULATED TO BE "+realPath)

print("PARSING PARAMETERS...")
parser = optparse.OptionParser()
parser.add_option('-d', '--dev', action="store_true", help="Run in dev mode", default=False)
(parameters, args) = parser.parse_args()
print("PARAMETERS PARSED: "+str(parameters))

if parameters.dev:
    print("DEVELOPMENT MODE DETECTED")
    print("STOPPING NODES...")
    print("executing command: "+"sudo forever stopall")
    stop = subprocess.Popen("sudo forever stopall", shell=True)
    stop.wait()
    print("NODES STOPPED")
else:
    print("BUILD MODE DETECTED")
    print("STOPPING NGINX...")
    print("executing command: "+"sudo systemctl stop nginx")
    stopnginx = subprocess.Popen("sudo systemctl stop nginx", shell=True)
    stopnginx.wait()
    print("executing command: "+"sudo systemctl disable nginx")
    disablenginx = subprocess.Popen("sudo systemctl disable nginx", shell=True)
    disablenginx.wait()
    print("NGINX STOPPED")
    print("STOPPING NODES...")
    print("executing command: "+"sudo forever stopall")
    stop = subprocess.Popen("sudo forever stopall", shell=True)
    stop.wait()
    print("NODES STOPPED")
    print("STOPPING MONGODB...")
    print("executing command: "+"sudo systemctl stop mongod")
    stopmongo = subprocess.Popen("sudo systemctl stop mongod", shell=True)
    stopmongo.wait()
    print("executing command: "+"sudo systemctl disable mongod")
    disablemongo = subprocess.Popen("sudo systemctl disable mongod", shell=True)
    disablemongo.wait()
    print("MONGODB STOPPED")
