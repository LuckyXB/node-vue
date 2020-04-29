const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// 中间件相当于过滤器
// app.use(function(request,response,next){
//     // request.query.user_id
//     request.on()
//     // 业务逻辑
//     next();
// })

app.use(express.static(path.join(__dirname,'..','public')));// 设置静态文件路径
app.use(bodyParser.json());//分析提交上来的数据，jsonstr->JSON 解析为js对象挂载到req
app.listen(3000,function(err){
    if(err){
        console.log(err);
        return;
    }

    console.log('服务已经启动,http://localhost:3000');
});

app.get('/get_myfriends',function(req,res){
    let friends = [
        {name:'张三'},
        {name:'李四'}
    ]

    res.send(friends);
});

// post 表示提供一个post
app.post('/register_user',function(req,res){
    console.log(req.body);
    res.send({
        status: 1000,
        msg:"成功",
        data:[
            {user_id: '1000011'}
        ]
    });
});