var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "users";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({"message": "register"})
    }
   if(!event.body) {
       response.statusCode = 400;
       response.body = JSON.stringify({"message": "登録に失敗しました."});
       callback(null, response);
       return;
   }
   var body = JSON.parse(event.body);
   var uid = body.uid;
   var pass = body.password;
   
   var item = {
       "uid": uid,
       "password": pass
   };
   
   var param = {
       "TableName": tableName,
       "Item": item
   };
   
   dynamo.put(param, function(err, data){
       if(err) {
           response.statusCode = 400;
           response.body = JSON.stringify({"message":"登録に失敗しました"});
           callback(null, response);
           return;
       } else {
           response.body = JSON.stringify({"message":"プロフィールを登録しました。"});
           callback(null, response);
           return;
       }
   });
   
};