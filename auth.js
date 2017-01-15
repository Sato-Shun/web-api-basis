var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "users";

exports.handler = (event, context, callback) => {
   var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({"message": "auth"})
    }
    
    if(!event.body) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "入力が正しくありません"});
        callback(null, response);
        return;
    }
    
    var body = JSON.parse(event.body);
    var uid = body.uid;
    var pass = body.password;
    var getParam = {
        "TableName": tableName,
        "Key": {
                "uid":uid
        }
    };
    
    dynamo.get(getParam, function(err, data) {
        if(err) {
            response.statusCode = 400;
            response.body = JSON.stringify({"message": "認証に失敗しました"});
            callback(null, response);
            return;
        } else if(data.Item.uid == uid && data.Item.password == pass) {
            response.statusCode = 200;
            response.body = JSON.stringify({"message": "認証に成功しました"});
            callback(null, response);
            return
        } else {
            response.statusCode = 400;
            response.body = JSON.stringify({"message": "ユーザがみつかりません"});
            callback(null, response);
            return;
        }
    });
};