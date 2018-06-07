#!/bin/bash

NETWORK_NAME=factory-network
VERSION=0.0.6
CARDNAME=admin@factory-network

composer archive create -t dir -n .
composer network install -c $CARDNAME -a $NETWORK_NAME@$VERSION.bna
#composer network start --networkName $NETWORK_NAME --networkVersion $VERSION -A admin -c $CARDNAME -\
#-C ./credentials/admin-pub.pem
composer network upgrade -c $CARDNAME -n $NETWORK_NAME -V $VERSION
