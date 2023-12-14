const AWS = require('aws-sdk');

const lamdba = async (event) => {
  const body = JSON.parse(event.body)
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {
        email: event.pathParameters.params
      },
     UpdateExpression: 'set password = :r',
     ExpressionAttributeValues: {
        ':r': body.password,
      },
  };
  await dynamoDb.update(putParams).promise();

  return {
    statusCode: 201,
  };
};

export const main = lamdba;
