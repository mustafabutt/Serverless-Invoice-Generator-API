import type { AWS } from '@serverless/typescript';
import functions from "./src/functions/index";
import tableResources from "./resources/tables";
import cognitoResources from "./resources/cognito";
const serverlessConfiguration: AWS = {
  service: 'pro-v3',
  frameworkVersion: '3',
  plugins: ["serverless-esbuild", "serverless-offline","serverless-plugin-split-stacks"],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      REGION: "${aws:region}",
      USER_POOL_ID: { Ref: "CognitoUserPool" },
      USER_CLIENT_ID: { Ref: "CognitoUserPoolClient" },
      DYNAMODB_CUSTOMER_TABLE: "${self:service}-custoTable-${sls:stage}"
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["cognito-idp:AdminInitiateAuth"],
            Resource: ["*"],
          },
          {
            Effect: "Allow",
            Action: ["cognito-idp:AdminCreateUser"],
            Resource: ["*"],
          },
          {
            Effect: "Allow",
            Action: ["cognito-idp:AdminSetUserPassword"],
            Resource: ["*"],
          },
          {
            Effect: "Allow",
            Action: ["dynamodb:PutItem"],
            Resource: ["*"],
          },
          {
            Effect: "Allow",
            Action: ["dynamodb:Get*"],
            Resource: ["*"],
          },
          {
            Effect: "Allow",
            Action: ["dynamodb:Scan*"],
            Resource: ["*"],
          },
          {
            Effect: "Allow",
            Action: ["dynamodb:UpdateItem"],
            Resource: ["*"],
          },
          {
            Effect: "Allow",
            Action: ["dynamodb:DeleteItem"],
            Resource: ["*"],
          }
      ],
      },
    },
    httpApi: {
      cors: {
        allowedOrigins: ["*"],
        allowedMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
        allowedHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "Site-Id",
          "X-Api-Key",
          "X-Amz-Security-Token",
          "X-Amz-User-Agent",
          "X-Transaction-Key",
          "Access-Control-Allow-Origin",
        ],
      },
      authorizers: {
        customAuthorizer: {
          type: "request",
          functionName: "customAuthorizer"
        },
      },
    },
  },
  // import the function via paths
  functions: functions,
  // package: { individually: true },
  custom:{
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start:{
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      ...cognitoResources?.Resources,
      ...tableResources?.Resources,
    },
    Outputs: {
      ...cognitoResources?.Outputs,
      ...tableResources.Outputs,
    },
  },
};
module.exports = serverlessConfiguration;