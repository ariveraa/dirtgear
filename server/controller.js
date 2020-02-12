module.exports = { 
    addPost: async(req,res) => { 
        const db = req.app.get('db')
        const {id} = req.session.user.pro_id
        const{make, model, hours, description, aval_from, aval_to} = req.body

        let [post] = await db.create_post([id, make, model, hours, description, aval_from, aval_to])
        res.status(200).send(post)
    }, 
    getAllPosts : async(req,res) => { 
        const db = req.app.get('db')
        let [posts] = await db.get_all(); 
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

        let [posts] = await db.get_user_post(id); 
        res.status(200).send(posts)
    }, 
    delete: (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_post(id)
        res.status(200).send('post deleted')

    }

}