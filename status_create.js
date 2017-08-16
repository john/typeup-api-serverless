import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const statusId = uuid.v1();
  
  var statusItem ={
    statusId: statusId,
    cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
    userName: data.userName,
    title: data.title,
    content: null,
    userState: data.userState,
    attachment: data.attachment,
    createdAt: new Date().toISOString(),
  }
  
  // var userUpdateExpression = 'set last_status_id=:sid, last_status_title = :t, last_status_createdAt = :ca, last_status_attachment = :lsa'
  // var userAttributeValues = {
  //   ":sid": statusId,
  //   ":t": data.title,
  //   ":ca": new Date().toISOString(),
  //   ":lsa": data.attachment,
  // }
  var userUpdateExpression = 'set last_status_id=:sid, last_status_title = :t, last_status_content = :c, last_status_createdAt = :ca, last_status_attachment = :lsa'
  var userAttributeValues = {
    ":sid": statusId,
    ":t": data.title,
    ":c": null,
    ":ca": new Date().toISOString(),
    ":lsa": data.attachment,
  }
  
  if( data.content ) {
    statusItem.content = data.content
    userAttributeValues[":c"] = data.content
  }
  // if( data.content ) {
  //   statusItem.content = data.content
  //   userUpdateExpression += ', last_status_content = :c'
  //   userAttributeValues[":c"] = data.content
  // }
    
  const status_params = {
    TableName: 'statuses',
    Item: statusItem,
  };
  
  const user_update_params = {
    TableName: 'users',
    Key: {
      userName: data.userName,
    },
    UpdateExpression: userUpdateExpression,
    ExpressionAttributeValues: userAttributeValues,
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