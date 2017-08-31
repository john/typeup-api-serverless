import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const tableName = 'typeup-statuses-' + process.env.stage;
  const params = {
    TableName: tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    }
  };
  
  try {
    const result = await dynamoDbLib.call('query', params);
    callback(null, success(result.Items));
  } catch(e) {
    console.log(e);
    callback(null, failure({status: false}));
  }
};