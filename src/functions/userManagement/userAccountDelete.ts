const AWS = require('aws-sdk');

const lamdba = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {
        email: event.pathParameters.params
      },
  };
  await dynamoDb.delete(putParams).promise();
  
  return {
    statusCode: 201,
  };
};

export const main = lamdba;
