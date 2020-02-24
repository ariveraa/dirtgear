const aws = require('aws-sdk'); 
module.exports = { 
    addPost: async(req,res) => { 
        const db = req.app.get('db')
        const {pro_id} = req.session.user

        let{make, model, hours,price, description, from, to, photo1, photo2, photo3} = req.body
       

        const format = (day) => {
            day = JSON.stringify(day)
            day = day.split('')
            day = day.splice(0,11)
            day= day.join('')
            return day 
        }
        from = format(from); 
        to = format(to); 
       
 
        let [post] = await db.posts.create_post([+pro_id, make, model, +hours, +price, description, from, to, photo1, photo2, photo3])
        res.sendStatus(200)
    }, 
    editPost: async(req,res) => { 
        const db = req.app.get('db')
        const {id} = req.params
        let{make, model, hours,price, description, from, to, photo1, photo2, photo3} = req.body

        const format = (day) => {
            day = JSON.stringify(day)
            day = day.split('')
            day = day.splice(0,11)
            day= day.join('')
            return day 
        }
        from = format(from); 
        to = format(to); 
       let [post] = await db.posts.edit_post([+id, make, model, +hours, +price, description, from, to, photo1, photo2, photo3])
       res.sendStatus(200)

    }, 
    getAllPosts : async(req,res) => { 
        const db = req.app.get('db')
        let posts = await db.posts.get_all();
        
        res.status(200).send(posts); 
    }, 
    getPost: async(req,res) => { 
        const db = req.app.get('db')
        const {id} = req.params

        let [post] = await db.posts.get_post(id); 
        delete post.password
        res.status(200).send(post)
    }, 
    getUserPost: async(req,res) => { 
        const db = req.app.get('db')
        const {pro_id} = req.session.user
        
        let posts = await db.posts.get_user_post(pro_id); 
        // console.log(posts)
       
        res.status(200).send(posts)
    }, 
    deletePost: (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.posts.delete_post(id)
        res.status(200).send('post deleted')

    },

    removeImage : (req, res) => { 
        
        const {key} =  req.params
        
        let s3 = new aws.S3(); 
        let params = { 
            Bucket:'dirtgearco', 
            Key: key
        }; 
        s3.deleteObject(params, (err,data) => { 
            if(err){ 
                console.log(err); 
               
            }
        
        });
    }

}