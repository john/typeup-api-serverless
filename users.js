// replace with something calling cognito, unless it turns out you need to create a 'users' table in ddb
// import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

import AWS from 'aws-sdk';

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';


export async function main(event, context, callback) {
  // const params = {
  //   TableName: 'statuses',
  //   // 'KeyConditionExpression' defines the condition for the query
  //   // - 'userId = :userId': only return items with matching 'userId' partition key
  //   // 'ExpressionAttributeValues' defines the value in the condition
  //   // - ':userId': defines 'userId' to be Identity Pool identity id of the authenticated user
  //   KeyConditionExpression: "userId = :userId",
  //   ExpressionAttributeValues: {
  //     ":userId": event.requestContext.identity.cognitoIdentityId,
  //   }
  // };

  // from: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#listUsers-property
  // move this to a cognito-config.js file
  // const cognito: {
  //   REGION: 'us-west-2',
  //   USER_POOL_ID : 'us-west-2_7TooDx4yJ',
  //   APP_CLIENT_ID : '2sdk53svubdtll8gigcscjb0an',
  //   IDENTITY_POOL_ID: 'us-west-2:a29de7a9-b998-43cf-913d-201086b4442e',
  // }

  const params = {
    UserPoolId: 'us-west-2_7TooDx4yJ', /* required */
    AttributesToGet: [
      'Username',
      /* more items */
    ],
    // Filter: 'STRING_VALUE',
    // Limit: 0,
    // PaginationToken: 'STRING_VALUE'
  };

  try {
    // const result = await dynamoDbLib.call('query', params);
    // Return the matching list of items in response body

    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#listUsers-property
    // const result = await CognitoUserPool.call('something' params)


    // Instead of stuff below try just instantiating a cognito userpool direction, as in login.js on the client:
    // const userPool = new CognitoUserPool({
    //   UserPoolId: config.cognito.USER_POOL_ID,
    //   ClientId: config.cognito.APP_CLIENT_ID
    // });


    var config = new AWS.Config({})
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    // cognitoidentityserviceprovider.adminForgetDevice(params, function (err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log(data);           // successful response
    // });

    cognitoidentityserviceprovider.listUsers(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        // console.log(data);           // successful response
        return data;
      }
    });

    callback(null, success(result.Items));
  } catch(e) {
    console.log(e);
    callback(null, failure({status: false}));
  }

};