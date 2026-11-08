#!/bin/sh
set -e

./script/rake generate
./script/rake deploy
