"use strict";

const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2021-10-05",
});

module.exports.handler = (event, context, cb) => {
  const params = {
    TableName: "TermicaDesignTable",
  };

  dynamoDB.scan(params, (err, data) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      const unmarshalledData = data.Items.map((el) => {
        return AWS.DynamoDB.Converter.unmarshall(el);
      });

      const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify(unmarshalledData),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
      };

      cb(null, response);
    }
  });
};
