import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {

  // console.log(".authorizer.principalId: " + event.requestContext.authorizer.principalId);
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'statuses',
    Item: {
      statusId: uuid.v1(),
      userId: uuid.v1(),
      cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
      title: data.title,
      content: data.content,
      userState: data.userState,
      attachment: data.attachment,
      // day: 2017-08-17
      createdAt: new Date().toISOString(),
    },
  };

  try {
    const result = await dynamoDbLib.call('put', params);
    callback(null, success(params.Item));
  } catch(e) {
    console.log(e);
    callback(null, failure({status: false}));
  }

};