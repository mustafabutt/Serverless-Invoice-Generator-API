
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

const lamdba = async (event) => {
    try {
        const data = {
          "alg": "RS256",
          "e": "AQAB",
          "kid": "FJf/5P+EdXRnaksc9DilxviCiqcz1prHWQOEQ1wCa70=",
          "kty": "RSA",
          "n": "v7SjfTZ5DO1dIT9Wc8BODgkadXaiAIaPeAgcgsbOOPFQlpk6mxY54z_STL3P64LAk00l5kYRzIENcBoZ60oTfVfKQebSevZObsDRMU-LoIOu6lM5sSMLnr4KmeqP7qGGsPLQzGOV_njE-AwiWKluF4tts6223JkAtYzgMxWEn-njQx90waLsaDMirpQ5pKHQ8OfoJZHw3xa5ofL0flmLtGnp9BUX0dxwlSMRoCuE4BkkYmJlEUqnNMhsnzmmwThjR8IIpF4L-E58Qv60QwsOeHeZ5lODPA2RxfhQzrsxaEqheeNnsHLrHwpgwHM7okXlhR_-4FAFEEs4JcJ7xslf-w",
          "use": "sig"
      }
      const authorization = event.headers.authorization;
  
      if (!authorization) {
         throw Error('Token not found');
      }
      const token = authorization;
      const pem = jwkToPem(data);
      const auth = jwt.verify(token, pem, { algorithms: ['RS256'] });
      return {
        principalId: 'anonymous',
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Allow',
              Resource: event.routeArn,
            },
          ],
        },
      };
  
    } catch (error) {
      throw Error('Unauthorized');
    }
};

export const main = lamdba;
