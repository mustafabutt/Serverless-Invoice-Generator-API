import type { AWS } from "@serverless/typescript";

const cognitoResources:AWS["resources"] = {
  Resources: {
    CognitoUserPool: {
      Type: "AWS::Cognito::UserPool",
      Properties: {
        UserPoolName: "${self:service}-${sls:stage}-userpool",
        UsernameAttributes: ["email"],
        AutoVerifiedAttributes: ["email"],
      },
    },
    CognitoUserPoolClient: {
      Type: "AWS::Cognito::UserPoolClient",
      Properties: {
        ClientName: "WebApp-${sls:stage}",
        UserPoolId: {
          Ref: "CognitoUserPool",
        },
        ExplicitAuthFlows: ["ADMIN_NO_SRP_AUTH"],
        IdTokenValidity: "5",
        AccessTokenValidity: "5",
        GenerateSecret: false,
      },
    }
  },
  Outputs: {
    CognitoUserPool: {
      Value: {
        Ref: "CognitoUserPool",
      },
      Export: {
        Name: "${self:service}-${sls:stage}-cognito-userpool",
      },
    },
    CognitoUserPoolClient: {
      Value: {
        Ref: "CognitoUserPoolClient",
      },
      Export: {
        Name: "${self:service}-${sls:stage}-congito-userpool-client",
      },
    },
  },
};


export default cognitoResources;