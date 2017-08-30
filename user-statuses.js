import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {

  const userId = event.pathParameters.userId;
  const user_params = {
    TableName: 'statuses',
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    }
  };

  try {
    const result = await dynamoDbLib.call('query', user_params);
    if (result.Items) {
      callback(null, success(result.Items));
    } else {
      callback(null, failure({status: false, error: 'Item not found.'}));
    }
  } catch(e) {
    console.log(e);
    callback(null, failure({status: false}));
  }

};
