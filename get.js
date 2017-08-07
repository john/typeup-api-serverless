import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'statuses',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    // Key: {
    //   userId: event.requestContext.identity.cognitoIdentityId,
    //   statusId: event.pathParameters.id,
    // },
    Key: {
      statusId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({status: false, error: 'Item not found.'}));
    }
  } catch(e) {
    console.log(e);
    callback(null, failure({status: false}));
  }

};