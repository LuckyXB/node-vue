const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const {getStoreDB} = require('../mongodb/mongodb');

const app = express();

const CONST = require('./constants');

app.use(express.static(path.join(__dirname,'..','public')));
app.use(bodyParser.json());

app.post('/register',function(req,res){
  
    getStoreDB(function(storeDB){
        storeDB.collection('users').insertOne(req.body,function(err,result){
            if(err){
               res.send({
                   status:CONST.FAIL,
                   msg:err
               });
               return;
            }
    
            res.send({
                status:CONST.SUCCESS,
                msg:'success',
                data:{
                    user_id:result.insertedId
                }
            })
        });
        //res.send('ok');// 回调顺序避免报错
    })
    
});

app.post('/login',function(req,res){

    const login_name = req.body.login_name;
    const pwd = req.body.pwd;
    getStoreDB(function(storeDB){

        storeDB.collection('users').find({login_name:login_name,pwd:pwd}).toArray(function(err,result){

            if(err){
                res.send({
                    status:CONST.FAIL,
                    msg:'登录失败'
                })
                return;
            }
            if(result.length !== 0){
                res.send({
                    status:CONST.SUCCESS,
                    msg:'ok'
                })
            }else{
                res.send({
                    status:10003,
                    msg:'登录失败'
                })
            }
        });
    });
})
app.listen(3000,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('listening port 3000')
});

