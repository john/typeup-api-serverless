import AWS from 'aws-sdk';

// If you have multiple AWS profiles in your credential, specify which to use
// const credentials = new AWS.SharedIniFileCredentials({profile: 'my-profile'})
// AWS.config.credentials = credentials;

AWS.config.update({region:'us-west-2'});

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}