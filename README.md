# typeup-api-serverless

- This is heavily based on the tutorial in http://serverless-stack.com/

## To deploy
- Make sure credentials are set up. If you have a ~/.aws/credentials file, make sure it has a default value. To create that file, run:
`serverless config credentials --provider aws --key your-key-here --secret your-secret-here`

- In working directory, run:
- `serverless deploy`
- For more info see: http://serverless-stack.com/chapters/deploy-the-apis.html

### FUCKEDUP
- When creating the API, the method stuff for cors isn't getting set up correctly, so I had to go in and do it manually:
- And then you get a new error, about the role not having the correct permissions. You once again have to use the console: go into IAM -> Roles, find the right one (Cognito_TypeUpUserPoolAuth_Role in this case), and attach the managed policies for the API Gateway
BINGO! How to set this up automatically via serverless.yml?


### TODO


- Support 'title' field for status
- serverless.yml should create the S3 bucket for uploads
- Get statuses by date
  - Allow 'today' call to get that days statuses
- Parameterize region used in serverless.yml, create.js, dynamodb-lib.js
- Add CloudFormation template to automate all the stuff the tutorial says to do by hand
- Write separate React client app
- Add support for file uploads (sketches of what you're working on, etc)

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

