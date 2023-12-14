const AWS = require('aws-sdk');

const lamdba = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {
        email: event.pathParameters.params
      },
  };
  const data =await dynamoDb.get(putParams).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(data)
  };
};

export const main = lamdba;
