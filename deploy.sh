#!/bin/bash
# $1 = filename
# $2 = networkName
NETWORK_NAME=factory-network
NETWORK_VERSION=0.2.10-deploy.4
PEER_ADMIN=PeerAdmin@fabric-network


if [[ $1 != 'upgrade' ]]; then
    composer network install -c PeerAdmin@fabric-network -a $NETWORK_NAME@$NETWORK_VERSION.bna
    composer network start --networkName $NETWORK_NAME --networkVersion $NETWORK_VERSION -A admin -S adminpw -c $PEER_ADMIN
else
    composer network upgrade -c $PEER_ADMIN -n $NETWORK_NAME -V $NETWORK_VERSION
fi