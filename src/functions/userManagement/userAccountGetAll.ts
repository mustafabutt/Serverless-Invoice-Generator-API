
const AWS = require('aws-sdk');

const lamdba = async (event) => {
  
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
  };
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  if (result.Count === 0) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items.map((customer) => {
        return {
          email: customer.email,
          password: customer.password,
          age: customer.age
        };
      }),
    }),
  };

};

export const main = lamdba;
