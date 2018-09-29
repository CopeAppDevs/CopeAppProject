#! /usr/bin/env python3.7

import sys
import os
import signal
import subprocess


class Node:
    port = 0
    activeConnections = 0
    PID = 0
    
    def __init__(self, port, PID, activeConnections):
        self.port = port
        self.activeConnections = activeConnections
        self.PID = PID
        


def checkPorts(nodePorts, hostname):
    openSessions = {}
    for port in nodePorts:
        openSessions[port] = subprocess.check_output("netstat -anp | grep ESTABLISHED | grep -c " + hostname + ":" + port)
        
    return(openSessions)    
        
        
def newNode(freePorts):        
    if freePorts:
        code = "node -p " + freePorts[0]
        freePorts.pop(0)
        nodePorts.append(freePorts[0])
        subprocess.call(code)
        PID = 0
        node = Node(freePorts[0], PID, 0)
        return node
    else:
        return 0
    
    
def popNode(node):        
    #kill node by pid
    return 0
#decidere se passare args o fare leggere dal config    
    
hostname = sys.argv[0]
firstPort = sys.argv[1]
sessionLimiter = sys.argv[2]
minNodes = sys.argv[3]
nodes = open("data/serverPIDs.db","r")
nodeList = []
for line in nodes:
    node = Node(line.split()[0], line.split()[1], 0)
    nodeList.append(node)
    
nodes.close()

nodePorts = (node.port for node in nodeList)

freePorts = (x for x in range(firstPort, firstPort + maxNodes - 1))
freePorts = set.difference_update(nodePorts)
    
openSessions = {}    
openSessions = checkPorts(nodePorts, hostname)
for port, connections in openSessions.items():
    averageTraffic = averageTraffic + connections
    
averageTraffic = double( (averageTraffic / len(openSessions)) / sessionLimiter ) 
nodes = open("data/serverPIDs.db","w") 
if averageTraffic > 0.8:
    nodeList.append(newNode(maxNodes, freePorts))
    #TODO aggiungere
elif (averageTraffic < 0.2) and (freePorts > minNodes):
    popNode(openSessions[nodePorts[0]])
    
nodes.close()
        
        
