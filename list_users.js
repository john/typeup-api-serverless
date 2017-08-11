import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const user_params = {
    TableName: 'users',
    // add param to include todayStatus as a nested attribute of users?
  };

  const status_params = {
    TableName: 'statuses',
    KeyConditionExpression: "userId = :id",
    // Key: {
    //   // cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
    //   // cognitoIdentityId: 'us-west-2:4826377c-3ae7-4159-8bf7-bfee894b5601',
    //   userId: '84d64d30-7e06-11e7-adbf-81c0a92ef0d4',
    // }
    // KeyConditionExpression: "#userid = :id",
    // ExpressionAttributeNames:{
    //   "#userid": "userId"
    // },
    ExpressionAttributeValues: {
      ":id":"84d64d30-7e06-11e7-adbf-81c0a92ef0d4"
    }
  };

  try {
    //const users = await dynamoDbLib.call('scan', user_params);
    const statuses = await dynamoDbLib.call('query', status_params);

    // users.Items.map...

    // do an awful double-nested loop thing to nest the statuses in the users array.

    // Return the matching list of items in response body
    // callback(null, success(users.Items));
    callback(null, success(statuses));
  } catch(e) {
    console.log(e);
    callback(null, failure({status: false}));
  }

};