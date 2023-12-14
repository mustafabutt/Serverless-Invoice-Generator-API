const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

const lamdba = async (event) => {

    const { USER_CLIENT_ID } = process.env
    const params = {
      ClientId: USER_CLIENT_ID,
      ConfirmationCode: JSON.parse(event.body).code,
      Password: JSON.parse(event.body).password,
      Username: JSON.parse(event.body).email
  }
  const response = cognito.confirmForgotPassword(params).promise();
  return response;
};

export const main = lamdba;
