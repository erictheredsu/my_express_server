#!/bin/bash

webapps_path="${PWD}/webapps"
if [ ! -e "$webapps_path" ] 
then mkdir "$webapps_path" 	
fi

echo "copy your web contents to ./webapps folder"

#install nodejs express
npm install --save

#run express
node http_server_sync.js
