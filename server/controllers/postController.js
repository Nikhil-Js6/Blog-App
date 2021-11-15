const User = require('../models/User');
const Post = require('../models/Post');


class PostController {

    async createPost(req, res) {
        try {
            const createPost = new Post(req.body);
            const newPost = await createPost.save();
            res.status(200).json(newPost);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    async update(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if(post.username === req.body.username){
                try {
                    const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                    );
                    res.status(200).json(updatedPost);
                }catch(err) {
                    res.status(500).json(err);
                }
            }
            else{
                res.status(403).json("You can Update only your Post!");
            }
        }catch(err) {
            res.status(500).json(err);
        }
        
    }

    async delete(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if(post.username === req.body.username) {
                try {
                    await Post.findByIdAndDelete(req.params.id);
                    res.status(200).json("Post Deleted Successfully");
                }catch(err) {
                    res.status(500).json(err);
                }
            }else{
                res.status(403).json("You can Delete only your Posts!");
            }
        }catch(err) {
            res.status(500).json(err);
        }
    }

    async getPost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        }catch(err) {
            res.status(500).json(err);  
        }
    }

    async getAllPosts(req, res) {
        const username = req.query.user;
        const catName = req.query.categ;
        try {
            let posts;
            if (username) {
                posts = await Post.find({ username });
            }
            else if (catName) {
                posts = await Post.find({ 
                    category: {
                        $in: [catName],
                    },
                });
            }
            else {
                posts = await Post.find();
            }
            res.status(200).json(posts);
        }catch(err) {
            res.status(500).json(err);  
        }
    }
}

module.exports = new PostController();
