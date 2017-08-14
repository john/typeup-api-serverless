import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {

  console.log("-----------------> starting main in status_get")

  const params = {
    TableName: 'statuses',
    Key: {
      statusId: event.pathParameters.id,
    },
  };

  try {
    console.log( '-----------------> key: ' + params.Key.statusId)
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
