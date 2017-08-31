import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const tableName = 'typeup-statuses-' + process.env.stage;
  const params = {
    TableName: tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      statusId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('delete', params);
    callback(null, success({status: true}));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};