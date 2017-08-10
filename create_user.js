import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {

  const data = JSON.parse(event.body);
  const params = {
    TableName: 'users',
    Item: {
      userId: uuid.v1(),
      cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
      username: data.username,
      email: data.email,
      createdAt: new Date().getTime(),
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


// TODO: return the userId, put it into props, and include it with each status object when creating those.