#! /usr/bin/env python3.7

import sys
import os
import subprocess
import datetime


class Node:
    port = 0
    activeConns = 0
    PID = 0

    def __init__(self, port, PID, activeConns):
        self.port = port
        self.activeConns = activeConns
        self.PID = PID



def checkPorts(hostname, port):
    return activeConns(subprocess.check_output("netstat -anp | grep ESTABLISHED | grep -c " + hostname + ":" + port))



def newNode(onPort):
    code = "node -p " + onPort + " &"
    PID = subprocess.check_output(code)
    if PID:
        node = Node(onPort, PID, 0)
        return node
    else:

        return 0


def popNode(PID):
    subprocess.call("kill -9 " + PID)


hostname = sys.argv[0]
firstPort = sys.argv[1]
sessionLimiter = sys.argv[2]
minNodes = sys.argv[3]
maxNodes = sys.argv[4]
nodes = open("data/serverPIDs.db","r")
nodeList = []
for line in nodes:
    node = Node(line.split()[0], line.split()[1], 0)
    nodeList.append(node.replace("\n",""))
nodes.close()
averageTraffic = 0

nodesBefore = len(nodeList)

for node in nodeList:
    node.activeConns = checkPorts(hostname, node.port)
    averageTraffic += node.activeConns

averageTraffic = averageTraffic / len(nodeList)

log = open("data/logs/daemon.log", "a+")

while (averageTraffic > sessionLimiter) & (len(nodeList) + 1 < maxNodes):
    onPort = nodeList[-1] + 1
    nodetmp = newNode(onPort)
    if nodetmp != 0:
        nodeList.append(nodetmp)
        log.write(datetime.datetime.now() + " -- Node at port:" + nodetmp.port + " was succesfully started")
    else:
        log.write(datetime.datetime.now() + " -- An error occurred while starting Node on port:" + onPort)
    if (len(nodeList) + 1 < maxNodes):
        log.write(datetime.datetime.now() + " -- Max Nodes already online")

while (averageTraffic < 0.1) & (len(nodeList) - 1 > minNodes):
    popNode(nodeList[-1].PID)
    log.write(datetime.datetime.now() + " -- Removed Node with PID:" + nodeList[-1].PID)
    nodeList.pop(-1) #rimuove sempre l'ultimo creato
    for node in nodeList:
        node.activeConns = checkPorts(hostname, node.port)
        averageTraffic += node.activeConns
    averageTraffic = averageTraffic / len(nodeList)
    if len(nodeList) - 1 > minNodes:
        log.write(datetime.datetime.now() + " -- Minimum Nodes existing")


nodes = open("data/serverPIDs.db","w")
for line in nodeList:
    nodes.write(line.port + " " + line.PID + "\n")

log("-- " + datetime.datetime.now() + "-- End of daemon cycle. nodes created: " + len(nodeList) - nodesBefore )    #TODO aggiungere nel nog nodes distrutti o avviati
nodes.close()
