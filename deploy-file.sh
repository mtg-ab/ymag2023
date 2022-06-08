#!/bin/bash
# File: convert.sh

parentdir=$(echo "/{$1" | sed 's|^/[^/]*||')
echo "Module en cours de deploiement..."
yarn hs upload --overwrite --portal=mtg-dev-antoine ./$1 boilerplate-mtg-hubspot/$parentdir
