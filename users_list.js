import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'users',
  };

  try {
    const results = await dynamoDbLib.call('scan', params);

    callback(null, success(results.Items));
  } catch(e) {
    console.log(e);

    callback(null, failure({status: false}));
  }

};