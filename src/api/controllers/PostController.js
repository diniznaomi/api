const PostService = require('../services/Posts/PostService');
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
            const postData = req.body;
            const userId = req.userId; 
            await postService.createPost(postData, userId);
            return res.status(200).json({ message: "Post created" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async likePost(req, res) {
        try {
            const { postId } = req.params; 
            const userId = req.userId; 
            await postService.addLikeToPost(postId, userId);
            return res.status(200).json({ message: 'Post liked successfully' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new PostController();