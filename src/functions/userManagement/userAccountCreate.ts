const AWS = require('aws-sdk');

const lamdba = async (event) => {
  const body = JSON.parse(event.body)
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      email: body.email,
      password: body.password,
      avatar:body.avatar
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
  };
};

export const main = lamdba;
