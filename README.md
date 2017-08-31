# typeup-api-serverless

- This demo is indebted to http://serverless-stack.com/. Thanks guys!

### Setup

// maybe can remove this, serverless.yml should be creating the files
- create dynamodb tables
  - 'users' has index on userId
  - 'statuses' has index on statusId, and a secondary index on userId (verify that's necessary).
- create an S3 bucket for uploads. Make sure CORS settings are correct.


- Install packages:
  - npm init -y
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
- `serverless deploy --stage prod`
- For more info see: http://serverless-stack.com/chapters/deploy-the-apis.html

###
- To remove the app (deletes all tables, lambdas, and buckets, forever):
`serverless remove --stage prod `


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

