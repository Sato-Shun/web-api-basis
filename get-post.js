var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "posts";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin":"*"
        },
        body: JSON.stringify({"message":"get 20 post"})
    }
    
    if(!event.queryStringParameters){
        response.statusCode = 400;
        response.body = JSON.stringify({"message":"不正な入力"});
        callback(null, response);      
        return;   
    }
    var qsp = event.queryStringParameters;
    
    var param = {
        "TableName":tableName,
    }
    dynamo.scan(param, function(err, data){
        if(err) {
            response.statusCode = 400;
            response.body = JSON.stringify({"message":"不正な入力"});
            callback(null, response);      
            return;   
        } else {
            var posted_message = [];
            var count = 0;
            for(var i=0; i<data.Items.length; i++){
              if(qsp.channel === data.Items[i].channel) {
                     array[count] = data.Items[i].message;
                     count++;
              }
            }
            response.body = JSON.stringify({"posts":posted_message});
            callback(null, response);      
            return;
        }
    });
    
    
};