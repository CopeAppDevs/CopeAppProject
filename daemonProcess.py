#! /usr/bin/env python3.7

import sys
import os
import signal

def checkPorts(nodePorts, hostname):
    openSessions = {}
    for port in nodePorts:
        openSessions[port] = subprocess.check_output("netstat -anp | grep ESTABLISHED | grep -c " + hostname + ":" + port)
        
    return(openSessions)    
        
        
def newNode(maxNode):        
    if