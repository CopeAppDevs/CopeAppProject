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

if parameters.dev:
    print("DEVELOPMENT MODE DETECTED")
    print("STOPPING NODE...")

    


    port = options.get("devPort", "8023")
    dbhost = options.get("dbHost", "localhost")
    dbport = options.get("dbPort", "666")
    print("debug: "+port+"; "+dbhost+":"+dbport+";")
    print("executing command: "+"sudo forever start -a -p "+realPath+"/data/dev/ -l devLog.log -e devErr.err -o devOut.out --pidFile "+realPath+"/data/dev/devPID.pid "+realPath+"/app.js -p "+port+" --dbhost "+dbhost+":"+dbport+" --dev")
    subprocess.Popen("sudo forever start -a -p "+realPath+"/data/dev/ -l devLog.log -e devErr.err -o devOut.out --pidFile "+realPath+"/data/dev/devPID.pid "+realPath+"/app.js -p "+port+" --dbhost "+dbhost+":"+dbport+" --dev", shell=True)
    print("NODE STARTED AT localhost:"+port+"!")
else:
