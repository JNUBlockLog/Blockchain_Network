#!/bin/bash

composer archive create --archiveFile factory-network@$1.bna\
 --sourceType dir --sourceName factory-network

composer network install -c PeerAdmin@fabric-network -a factory-network@$1.bna

if [ $1 -eq "0.0.1"]; then
    composer network start --networkName factory-network\
    --networkVersion $1 -A admin -S adminpw -c PeerAdmin@fabric-network
else
    composer network upgrade -n factory-network\
     -V $1 -c PeerAdmin@fabric-network