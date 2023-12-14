const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
import {sendResponse, validateInput} from "../../utils/index"
const lamdba = async (event) => {
  try {
    const isValid = validateInput(event.body)
    if (!isValid)
        return sendResponse(400, { message: 'Invalid input' })

    const { email, password } = JSON.parse(event.body)
    const { USER_POOL_ID, USER_CLIENT_ID } = process.env
    const params = {
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        UserPoolId: USER_POOL_ID,
        ClientId: USER_CLIENT_ID,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    }
    const response = await cognito.adminInitiateAuth(params).promise();
    return sendResponse(200, { message: 'Success', token: response.AuthenticationResult.IdToken })
  }
  catch (error) {
      const message = error.message ? error.message : 'Internal server error'
      return sendResponse(500, { message })
  }
};

export const main = lamdba;
