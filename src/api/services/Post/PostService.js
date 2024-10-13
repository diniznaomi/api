const PostRepository = require("../../repositories/PostRepository");

class PostService {
    constructor() {
        this.postRepository = new PostRepository;
    }

    async listPostsByCompany(company_id) {
        const response = await this.postRepository.listPostsByCompany(company_id);
    
        if (!response || response.length === 0) {
            return [];
        }
    
        const mapResponse = response.map(post => {
            return {
                id: post.id,
                message: post.message,
                createdAt: post.created_at,
                updatedAt: post.updated_at,
                author: post.author ? {
                    id: post.author.id,
                    name: post.author.name,
                    email: post.author.email,
                } : null,
                recipient: post.recipient ? {
                    id: post.recipient.id,
                    name: post.recipient.name,
                    email: post.recipient.email,
                } : null,
                likeCount: post.likes ? post.likes.length : 0,
                likes: post.likes ? post.likes.map(like => ({
                    id: like.id,
                    likedBy: {
                        id: like.user.id,
                        name: like.user.name,
                    }
                })) : []
            };
        });        
    
        return mapResponse;
    }    

    async createPost(post){
        return this.postRepository.createPost(post);
    }
}
module.exports = PostService;