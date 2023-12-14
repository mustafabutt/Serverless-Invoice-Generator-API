
import type { AWS } from "@serverless/typescript";

const resources: AWS["resources"] = {
  Resources: {
    MainTable: {
      Type: "AWS::DynamoDB::Table",
      Properties: {
        AttributeDefinitions: [
          {
            AttributeName: "email",
            AttributeType: "S",
          }
        ],
        KeySchema: [
          {
            AttributeName: "email",
            KeyType: "HASH",
          }
        ],
        BillingMode: "PAY_PER_REQUEST",
        TableName: "${self:service}-custoTable-${sls:stage}",
      },
    },
  },
  Outputs: {},
};

export default resources;
