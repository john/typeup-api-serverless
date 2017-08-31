# python unit-tests.py

import subprocess
import json

def get_attribute_from_body(the_string, the_attribute):
    print "------> in function, the_string: "
    print the_string
    
    
    parsed_create_output = json.loads(the_string)
    
    print "-----parsed output"
    body_string = parsed_create_output['body']
    
    print "------> body_string: " + body_string
    
    body_json = json.loads(body_string)
    return body_json[the_attribute]

request_context = '"requestContext": { "identity": { "cognitoIdentityId": "USER-SUB-1234" } }'

stage = 'test'

# user_create_output = subprocess.check_output(['serverless', 'webpack', 'invoke', '--function', 'user-create', '--path', 'mocks/user-create-event.json', '--stage', stage])
user_create_output = subprocess.check_output(['serverless', 'invoke', '--local', '--function', 'user-create', '--path', 'mocks/user-create-event.json', '--stage', stage])

user_id = get_attribute_from_body( user_create_output, 'userId' )

# print "1. Created user with userId of '" + user_id + "'\n"

# # use the returned userId to get the user you just created
# get_user_data = '{"pathParameters": { "userId": "' + user_id + '" }, ' + request_context + ' }'
# user_get_output = subprocess.check_output(['serverless', 'invoke', '--local', '--function', 'user-get', '--data', get_user_data, '--stage', stage])
# fetched_user_id = get_attribute_from_body( user_get_output, 'userId' )
# print "2. Got user with userId of '" + user_id + "'\n"
#
# # create status, using fetched userId from above
#
# # create_status_data = """
# # {
# #   "body": "{\"userId\":\" \"%s\" \",\"title\":\"the title\",\"userName\":\"john\",\"content\":\"hello world\"}",
# #   "requestContext": {
# #     "identity": {
# #       "cognitoIdentityId": "us-west-2:b7fde2bd-857e-4167-852a-6c199bc1d165"
# #     }
# #   }
# # }
# # """
# #
# # blarg = """{
# #   "body": "{\"userId\":\"0026a4e0-8860-11e7-b571-8b49e5dc59ca\",\"title\":\"the title\",\"userName\":\"john\",\"userState\":\"i am so blocked.\",\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}",
# #   "requestContext": {
# #     "identity": {
# #       "cognitoIdentityId": "us-west-2:b7fde2bd-857e-4167-852a-6c199bc1d165"
# #     }
# #   }
# # }"""
# # # print (create_status_data % ('abcd1234'))
# # status_create_output = subprocess.check_output(['serverless', 'invoke', '--local', '--function', 'status-create', '--data', blarg, '--stage', 'prod'])
#
#
# status_create_output = subprocess.check_output(['serverless', 'invoke', '--local', '--function', 'status-create', '--path', 'mocks/status-create-event.json', '--stage', stage])
# status_id = get_attribute_from_body( status_create_output, 'statusId' )
# print '3. Create status returned this id: ' + status_id + "'\n"
#
# # use the returned statusId to get the status you just created
# get_status_data = '{"pathParameters": { "statusId": "' + status_id  + '" }, ' + request_context + ' }'
# status_get_output = subprocess.check_output(['serverless', 'invoke', '--local', '--function', 'status-get', '--data', get_status_data, '--stage', stage])
# get_status_id = get_attribute_from_body( status_get_output, 'statusId' )
# print '4. Got status with a statusId of ' + get_status_id + "'\n"
