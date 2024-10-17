const UsersService = require("../../Users/services/UsersService");
const PostsRepository = require("../repositories/PostsRepository");

class PostsService {
    constructor() {
        this.postRepository = new PostsRepository;
        this.usersServices = new UsersService;
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
    
        return mapResponse.sort((a,b) => b.createdAt - a.createdAt);
    }    

    async createPost(postData, userId) {
        const toUser = await this.usersServices.findUserByEmail(postData.to_user_email)
        return this.postRepository.createPost(postData.message, userId, toUser.id);
    }

    async addLikeToPost(postId, userId) {
        const post = await this.postRepository.findPostById(postId);
    
        if (!post) {
            throw new Error('Post not found');
        }
    
        return await this.postRepository.addLike(postId, userId);
    }
    
}
module.exports = PostsService;