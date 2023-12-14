const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

const lamdba = async (event) => {  
    const { USER_CLIENT_ID } = process.env
    const params = {
      ClientId: USER_CLIENT_ID,
      Username: JSON.parse(event.body).email
  }
  const response = cognito.forgotPassword(params).promise();
  return response;
};

export const main = lamdba;
