var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "channels";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers:{
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({"message": "get all channel"})
    }
    
    var getParam = {
        "TableName": tableName
    }
    
    dynamo.scan(getParam, function(err, data){
        if(err) {
            response.statusCode = 400;
            response.body = JSON.stringify({"message":"チャンネル取得失敗"});
            callback(null, response);
            return;
        } else {
            response.statusCode = 200;
            response.body = JSON.stringify({"channels":data.Items});
            callback(null, response);
            return;
        }
    });
};