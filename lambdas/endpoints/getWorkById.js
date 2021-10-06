"use strict";

const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2021-10-05",
});

module.exports.handler = (event, context, cb) => {
  const { id = "1" } = event;

  const params = {
    TableName: "TermicaDesignTable",
    Key: {
      workId: { S: id },
    },
  };

  dynamoDB.getItem(params, (err, data) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      const unmarshalledData = AWS.DynamoDB.Converter.unmarshall(data.Item);

      const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify(unmarshalledData),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };

      cb(null, response);
    }
  });
};
