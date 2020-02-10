const bcrypt = require('bcryptjs'); 

module.exports = { 
    register: async(req,res) => {
        const {username, password,phoneNumber} = req.body; 
        const db = req.app.get('db'); 

        let [user] = await db.check_username(username); 
        if(user){ 
            return res.status(400).send('Username taken')
        }
        let salt = bcrypt.getSaltSync(10); 
        let hash = bcrypt.hashSync(password, salt); 
        let [newUser] = db.create_profile(username, hash, phoneNumber); 
        req.session.user = newUser; 
        res.status(201).send(req.session.user); 
    },
    login: async(req,res) => {
        const{username,password} = req.body; 
        const db = req.app.get('db'); 

        let [user] = await db.check_username(username); 
        if(!user){
            return res.status(400).send('username not found'); 
        }
        let authenticated = bcrypt.compareSync(password, user.password); 
        if(!authenticated){ 
            return res.status(401).send('password is incorrect'); 
        }
        delete user.password; 
        req.session.user = user; 
        req.status(202).send(req.session.user); 
    }, 

    logout: async(req,res) => { 
        req.session.destroy(); 
        res.sendStatus(200); 
    }, 
    getProfile:(req,res) => { 
        if(req.session.user){ 
            res.status(200).send(req.session.user); 
        }
        else{ 
            res.status(200).send('please login'); 
        }
    }
}