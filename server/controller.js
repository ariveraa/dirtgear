module.exports = { 
    addPost: async(req,res) => { 
        const db = req.app.get('db')
        const {pro_id} = req.session.user

        let{make, model, hours,price, description, from, to} = req.body
       

        const format = (day) => {
            day = JSON.stringify(day)
            day = day.split('')
            day = day.splice(0,11)
            day= day.join('')
            return day 
        }
        from = format(from); 
        to = format(to); 
       
 
        let [post] = await db.posts.create_post([+pro_id, make, model, +hours, +price, description, from, to])
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

        let [post] = await db.get_post(id); 
        res.status(200).send(post)
    }, 
    getUserPost: async(req,res) => { 
        const db = req.app.get('db')
        const {id} = req.session.user.pro_id

        let [posts] = await db.posts.get_user_post(id); 
        res.status(200).send(posts)
    }, 
    deletePost: (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_post(id)
        res.status(200).send('post deleted')

    }

}