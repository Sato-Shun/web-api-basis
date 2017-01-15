var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "profiles";

exports.handler = (event, context, callback) => {
  var response = {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({"message": "Hello World"})
    };
    if(!event.body) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "入力が不足しています"});
        callback(null, response);
    } else {
      var body = JSON.parse(event.body);
      var uid = body.uid;
      var birthday = new Date(body.birthday).getTime();
      var meal = body.meal;
      
      var item = {
        "uid": uid,
        "birthday": birthday,
        "meal": meal
      };
      var param = {
        "TableName": tableName,
        "Item": item
      };
      dynamo.put(param, function(err, data){
          if(err){
              response.statusCode = 400;
              response.body = JSON.stringify({"message":"プロフィールの登録に失敗しました"});
              callback(null, response);
          } else{
              response.body = JSON.stringify({"message":"プロフィールの登録に成功しました"});
              callback(null, response);
          }
      });
    }
};