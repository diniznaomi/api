const PostService = require('../services/Post/PostService');
const postService = new PostService();

class PostController {
    async listPostsByCompany(req, res){
        try {
            const posts = await postService.listPostsByCompany(req.params.id);
            return res.status(200).status(200).json({ posts });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async createPost(req, res){
        try {
            await postService.createPost(req.body);
            return res.status(200).json({ message: "Post created" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new PostController();