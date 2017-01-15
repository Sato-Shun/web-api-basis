var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "channels";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({"message": "create channel"})
    };
    
    if(!event.body) {
       response.statusCode = 400;
       response.body = JSON.stringify({"message": "不正な入力"});
       callback(null, response);
       return;
   }
   
   var body = JSON.parse(event.body);
   var channel = body.channel;
   var description = body.description;
   
   var item = {
       "channel": channel,
       "description": description 
   };
   
   var param = {
       "TableName": tableName,
       "Item": item
   };
   
   dynamo.put(param, function(err, data){
       if(err) {
           response.statusCode = 400;
           response.body = JSON.stringify({"message":"チャンネル作成失敗"});
           callback(null, response);
           return;
       } else {
           response.statusCode = 200;
           response.body = JSON.stringify({"message": "チャンネル作成成功"});
            callback(null, response);
            return;
       }
   });

};