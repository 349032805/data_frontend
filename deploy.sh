#!/bin/sh

git pull
npm install
bower install --allow-root
grunt build
