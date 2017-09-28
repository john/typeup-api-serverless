# typeup-api-serverless

This repo demonstrates an API built with AWS Lambda and the AWS API Gateway. It uses the [Serverless](https://serverless.com/) framework, and also takes care of the creation and configuration of AWS infrastructure needed to run the demo, such as DynamoDB tables.

The API powers an app that allows members of a team to give daily status reports, similar to what you would do in an agile stand up meeting, but for distributed teams--there is [an accompanying React client](https://github.com/john/typeup-client) that uses the API. It code was inspired by the excellent Serverless demo at [Serverless Stack](http://serverless-stack.com/). Thanks guys!

### Setup

- Clone the repo into a local directory:
  - `git clone git@github.com:john/typeup-api-serverless.git`
  - `cd typeup-api-serverless`
- The app has been tested to work with node 8.4.0 and Serverless 1.21
- If you haven't already, install node and npm. Guide for installation on Mac [here](https://treehouse.github.io/installation-guides/mac/node-mac.html)
- Install packages:
  - npm init -y
  - npm install serverless -g
  - npm install serverless-webpack --save-dev
  - npm install aws-sdk --save-dev
  - npm install amazon-cognito-identity-js --save
  - npm install uuid --save
  - npm install --save-dev \
    babel-core \
    babel-loader \
    babel-plugin-transform-runtime \
    babel-preset-es2015 \
    babel-preset-stage-3 \
    serverless-webpack \
    glob \
    webpack \
    webpack-node-externals
- npm install --save babel-runtime
- Make sure you have an active AWS account with valid credentials set up. For more info see the [AWS Quick Configuration guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-quick-configuration).

### Client configuration
Deployment of the API creates an API Gateway endpoint, two DynamoDB tables, and an S3 bucket. When installing and configuring the [TypeUp client](https://github.com/john/typeup-client) to use the API, you'll need to enter the endpoint into the client configuration.

### Tests
- Deploy test env:
  - `serverless deploy --stage test`
- To run test independently:
  - `serverless webpack invoke --function status-create --path mocks/status-create-event.json --stage test`
  - `serverless webpack invoke --function status-get --path mocks/status-get-event.json --stage test`
  - `serverless webpack invoke --function user-create --path mocks/user-create-event.json --stage test`
  - `serverless webpack invoke --function user-get --path mocks/user-get-event.json --stage test`
  - `serverless webpack invoke --function user-statuses --path mocks/user-get-event.json --stage test`

## Deploy
- Make sure credentials are set up. If you have a ~/.aws/credentials file, make sure it has a default value. To create that file, run:
`serverless config credentials --provider aws --key your-key-here --secret your-secret-here`

- In working directory, run:
  - For test env: `serverless deploy --stage test`
  - For prod env: `serverless deploy --stage prod`
- For more info see: http://serverless-stack.com/chapters/deploy-the-apis.html

### Undeploy
To remove the app (deletes all tables, lambdas, and buckets, forever):
`serverless remove --stage prod`


### TODO

- The client is doing the authing right now. How to protect the API? Actually maybe already done
- https://aws.amazon.com/blogs/mobile/integrating-amazon-cognito-user-pools-with-api-gateway/

- serverless.yml should create the S3 bucket for uploads
- Parameterize region used in serverless.yml, create.js, dynamodb-lib.js
- Add Groups support
- Add SES emails to ask users who haven't sent a status yet to do so.
  - Run weekdays at 11
- Another notification to everyone when all statuses are collected

- Give users a profile page, let them:
  - Turn notifications off (set themselves to inactive)
  - See groups they belong to
  - See past statuses

### Notes
- For new deploy, remember you need to edit the Cognito policy document:
http://serverless-stack.com/chapters/create-a-cognito-identity-pool.html

