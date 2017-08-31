import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const tableName = 'typeup-users-' + process.env.stage;
  const userId = event.pathParameters.userId;
  const user_params = {
    TableName: tableName,
    Key: {
      userId: userId,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', user_params);
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
