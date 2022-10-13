#!/bin/bash
# File: convert.sh

parentdir=$(echo "/{$1" | sed 's|^/[^/]*||')
echo "Module ou template en cours de deploiement..."
yarn hs upload --overwrite --portal=mtg-dev-marin ./$1 boilerplate-mtg-hubspot/$parentdir
