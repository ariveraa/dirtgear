require('dotenv').config()
const express = require('express'),
    ctrl = require('./controller'), 
    authCtrl = require('./authController'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env, 
    massive = require('massive'), 
    cors = require('cors'),
    session = require('express-session'),
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


//auth endpoints

app.post('/auth/register', authCtrl.register); 
app.post('/auth/login', authCtrl.login); 
app.post('/auth/logout', authCtrl.logout); 
app.get('/auth/check', authCtrl.getProfile); 