var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "profiles";

var response = {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify({"message": "Hello World"})
}

exports.handler = (event, context, callback) => {
    var uid;
    var tmp = event.queryStringParameters;
    if(tmp && tmp.uid){
        uid = tmp.uid;
    }
    var param = {
        "TableName": tableName,
        "Key": {
            "uid": uid
        }
    };
    
    if(uid) {
        dynamo.get(param, function(err, data) {
            if(err) {
                //console.log(err);
                response.statusCode = 400;
                response.body = JSON.stringify({"message": "プロフィールの取得に失敗しました"});
                callback(null, response);
            } else if(data.Item) {
                response.body = JSON.stringify({"profiles": [data.Item]});
                callback(null, response);
            }else {
                response.body = JSON.stringify({"message": "データが見つかりませんでした"});
                callback(null, response);
            }
        });
    } else {
        dynamo.scan(param, function(err, data){
            if(err){
                response.statusCode = 400;
                response.body = JSON.stringify({"message": "プロフィールの取得に失敗しました。"});
                callback(null, response);
            } else {
                response.body = JSON.stringify({"profiles": data.Items});
                callback(null, response);
            }
        });
    }
};