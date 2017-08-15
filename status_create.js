import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const statusId = uuid.v1();
  const status_params = {
    TableName: 'statuses',
    Item: {
      statusId: statusId,
      cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
      userName: data.userName,
      title: data.title,
      content: data.content,
      userState: data.userState,
      attachment: data.attachment,
      createdAt: new Date().toISOString(),
    },
  };

// get User, so we can get the name. Would be good to figure out how to get that from the session in the client, and pass it through.
  // const user_fetch_params = {
  //
  // }
  
  const user_update_params = {
    TableName: 'users',
    Key: {
      userName: data.userName,
    },
    UpdateExpression: 'set last_status_id=:sid, last_status_title = :t, last_status_content = :c, last_status_createdAt = :ca',
    ExpressionAttributeValues:{
      ":sid": statusId,
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
    const user_result = await dynamoDbLib.call('update', user_update_params);

    callback(null, success(status_params.Item));
  } catch(e) {
    console.log(e);
    callback(null, failure({status: false}));
  }

};