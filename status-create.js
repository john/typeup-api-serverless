import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const statusId = uuid.v1();

  // base status item
  var statusItem ={
    statusId: statusId,
    cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
    userId: data.userId,
    title: data.title,
    content: null,
    userState: data.userState,
    attachment: data.attachment,
    createdAt: new Date().toISOString(),
  }

  var userUpdateExpression = 'set lastStatusId=:sid, lastStatusTitle = :t, lastStatusContent = :c, lastStatusCreatedAt = :ca, lastStatusAttachment = :lsa'
  var userAttributeValues = {
    ":sid": statusId,
    ":t": data.title,
    ":c": null,
    ":ca": new Date().toISOString(),
    ":lsa": data.attachment,
  }

  // update status & user data if there's content
  if( data.content ) {
    statusItem.content = data.content
    userAttributeValues[":c"] = data.content
  }
  
  const statusTableName = 'typeup-statuses-' + process.env.stage;
  const statusParams = {
    TableName: statusTableName,
    Item: statusItem,
  };
  
  const userTableName = 'typeup-users-' + process.env.stage;
  const userUpdateParams = {
    TableName: userTableName,
    Key: {
      userId: data.userId,
    },
    UpdateExpression: userUpdateExpression,
    ExpressionAttributeValues: userAttributeValues,
    ReturnValues:"UPDATED_NEW"
  }

  // separate failure statuses for user vs status
  try {
    
    // TODO: Add rollback on failure.
    const statusResult = await dynamoDbLib.call('put', statusParams);
    
    // make this dependent on the above returning successfully
    const userResult = await dynamoDbLib.call('update', userUpdateParams);

    callback(null, success(statusParams.Item));
  } catch(e) {
    console.log(e);
    callback(null, failure({status: false}));
  }
};
