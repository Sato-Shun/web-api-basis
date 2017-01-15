var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "posts";

function createPostId() {
    var id = "", i, random;
    for (i=0; i<32; i++) {
        random = Math.random()*16 | 0;
        id += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8): random)).toString(16);
    }
    return id;
}

exports.handler = (event, context, callback) => {
  var response = {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({"message":"create post"})
  }
  
  if(!event.body) {
      response.statusCode = 400;
      response.body = JSON.stringify({"message":"不正な入力"});
      callback(null, response);
      return;
  }
  
  var body = JSON.parse(event.body);
  var channel = body.channel;
  var from = body.from;
  var to;
  if(body.to) {
      to = body.to;
  } else {
      to = "everyone";
  }
  var message = body.message;
  var id = createPostId();
  var unixTime = new Date().getTime();
  
  var item = {
      "postId":id,
      "channel":channel,
      "unixTime":unixTime,
      "from":from,
      "to":to,
      "message":message
  };
  
  var param = {
      "TableName":tableName,
      "Item":item
  };
  
  dynamo.put(param, function(err, data) {
      if(err) {
          response.statusCode = 400;
          response.body = JSON.stringify({"message":"投稿に失敗しました"});
          callback(null, response);      
          return;
      } else {
        response.statusCode = 200;
        response.body = JSON.stringify({"message":"投稿に成功しました"});
        callback(null, response);
        return;
      }
  });
  
};