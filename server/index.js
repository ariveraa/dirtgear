require('dotenv').config()
const express = require('express'),
    ctrl = require('./controller'), 
    authCtrl = require('./authController'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env, 
    massive = require('massive'), 
    cors = require('cors'),
    session = require('express-session'),
    aws = require('aws-sdk'), 
    app = express(); 

app.use(express.json()); 
app.use(cors()); 

app.use(session({
    resave: false, 
    saveUninitialized:true, 
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000*60*60*24*365}
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT, () => console.log(`server running on ${SERVER_PORT}`));
})

//s3 setup 
app.get('/api/signs3', (req,res) => {
    aws.config = {
        region: 'us-west-1', 
        accessKeyId:AWS_ACCESS_KEY_ID, 
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }; 
    const s3 = new aws.S3(); 
    const fileName = req.query['file-name']; 
    const fileType = req.query['file-type']; 
    const s3Params = { 
        Bucket: S3_BUCKET,
        Key: fileName, 
        ContentType: fileType, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3Params, (err,data)=> { 
        if(err){ 
            console.log(err); 
            return res.end(); 
        }
        const returnData = { 
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        }; 
        return res.send(returnData)
    })
})




//auth endpoints

app.post('/auth/register', authCtrl.register); 
app.post('/auth/login', authCtrl.login); 
app.post('/auth/logout', authCtrl.logout); 
app.get('/auth/check', authCtrl.getProfile); 

//post endpoints

app.post('/api/post', ctrl.addPost); 
app.get('/api/posts', ctrl.getAllPosts); 
app.get('/api/post', ctrl.getPost); 
app.get('/api/user', ctrl.getUserPost);
// app.put('/api/post/:id', ctrl.editPost); 
app.delete('/api/post/:id', ctrl.deletePost); 
app.delete('/api/photo/:key', ctrl.removeImage); 
