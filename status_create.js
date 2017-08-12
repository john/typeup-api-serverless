import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const status_params = {
    TableName: 'statuses',
    Item: {
      statusId: uuid.v1(),
      cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
      userName: data.userName,
      title: data.title,
      content: data.content,
      userState: data.userState,
      attachment: data.attachment,
      createdAt: new Date().toISOString(),
    },
  };

  // THIS is somehow creating a new user, rather than updating an existing one, in some circumstances. See notes.
  // The newly created user has its own cognitoIdentityId, weirdly. Maybe the primary key for that table should
  // be the cognito username, it, the email address?
  const user_params = {
    TableName: 'users',
    Key: {
      // cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
      userName: data.userName,
    },
    UpdateExpression: 'set last_status_title = :t, last_status_content = :c, last_status_createdAt = :ca',
    ExpressionAttributeValues:{
      ":t": data.title,
      ":c": data.content,
      ":ca": new Date().toISOString(),
    },
    ReturnValues:"UPDATED_NEW"
  }

  // separate failure statuses for user vs status
  try {
    const status_result = await dynamoDbLib.call('put', status_params);

    // make this dependent on the above returning successfully
    const user_result = await dynamoDbLib.call('update', user_params);

    callback(null, success(status_params.Item));
  } catch(e) {
    console.log(e);
    callback(null, failure({status: false}));
  }

};