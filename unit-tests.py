import subprocess
import json

def get_status_id_from_body(the_string):
    parsed_create_output = json.loads(status_create_output)
    body_string = parsed_create_output['body'] #['statusId']
    body_json = json.loads(body_string)
    return body_json['statusId']

status_create_output = subprocess.check_output(['serverless', 'invoke', '--local', '--function', 'status-create', '--path', './mocks/status-create-event.json'])
create_status_id = get_status_id_from_body( status_create_output )
print 'create status returned this id: ' + create_status_id

get_data = '{"pathParameters": { "statusId": "' + create_status_id + '" }, "requestContext": { "identity": { "cognitoIdentityId": "USER-SUB-1234" } } }'
status_get_output = subprocess.check_output(['serverless', 'invoke', '--local', '--function', 'status-get', '--data', get_data])
get_status_id = get_status_id_from_body( status_get_output )
print 'successfully did a get using status id: ' + get_status_id
