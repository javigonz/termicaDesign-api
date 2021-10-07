const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2021-10-05",
});

module.exports.handler = (event, context, cb) => {
  const parseBody = JSON.parse(event.body);

  const newItem = {
    workId: { S: parseBody.workId },
    date: { S: parseBody.date },
    description: { S: parseBody.description },
    image: { S: parseBody.image },
    gotourl: { S: parseBody.gotourl },
    skills: { S: parseBody.skills },
    subtitle: { S: parseBody.subtitle },
    tag: { S: parseBody.tag },
    title: { S: parseBody.title },
    url: { S: parseBody.url },
  };

  const params = {
    TableName: "TermicaDesignTable",
    Item: newItem,
  };

  dynamoDB.putItem(params, (err, data) => {
    if (err) {
      console.log("ERROR --> ", err);
      cb(err);
    } else {
      const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify(newItem),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };

      cb(null, response);
    }
  });
};
