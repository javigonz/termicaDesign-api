"use strict";

const AWS = require("aws-sdk");
const SES = new AWS.SES();

module.exports.handler = (event, context, cb) => {
  const { to, name, from, text } = JSON.parse(event.body);

  if (!to || !from || !text) {
    return cb({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 400,
      body: {},
    });
  }

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: `Message from TermicaDesign web of ${name}` },
    },
    Source: from,
  };

  SES.sendEmail(params, (err, data) => {
    if (err) {
      console.log("ko --> ", err);
      return cb(err);
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
      console.log("ok --> ", response);
      cb(null, response);
    }
  });
};
