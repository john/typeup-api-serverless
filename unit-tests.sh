#!/bin/bash

# CREATE_RESPONSE=`serverless webpack invoke --function status-create --path ./mocks/status-create-event.json --type RequestResponse`

CREATE_RESPONSE=`serverless invoke --local --function status-create --path ./mocks/status-create-event.json --type RequestResponse`

echo "status is: $CREATE_RESPONSE"
echo "status: "
echo $CREATE_RESPONSE['status']


#  serverless invoke --local --function status-create --path ./mocks/status-create-event.json --type RequestResponse