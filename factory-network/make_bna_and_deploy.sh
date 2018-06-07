#!/bin/bash

NETWORK_NAME=factory-network
VERSION=0.0.2
CARDNAME=admin@

composer archive create -t dir -n .
composer network install -c admin@hackerton-network -a $NETWORK_NAME@$VERSION.bna
#composer network start --networkName $NETWORK_NAME --networkVersion $VERSION -A admin -c admin@hackerton-network -C /home/kiiren/.composer/cards/admin@hackerton-network/credentials/certificate
composer network upgrade -c admin@hackerton-network -n $NETWORK_NAME -V $VERSION
