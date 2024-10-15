const Post = require("../models/Post");
const User = require("../models/User");
const Company = require("../models/Company");
const Like = require("../models/Like"); 

class PostRepository {
    async createPost(message, userId, recipientId) {
        return await Post.create({
            message,
            user_id: userId,         
            to_user_id: recipientId, 
        });
    }

    async listPostsByCompany(company_id) {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'author',
                    include: [
                        {
                            model: Company,
                            as: 'company',
                            where: { id: company_id },
                        },
                    ],
                },
                {
                    model: User,
                    as: 'recipient',
                },
                {
                    model: Like,
                    as: 'likes', 
                    include: [
                        {
                            model: User,
                            as: 'user', 
                        },
                    ],
                },
            ],
        });

        return posts;
    }

    async deletePost(post_id) {
        await Post.destroy({
            where: {
                id: post_id,
            },
        });
    }

    async addLike(postId, userId) {
        return await Like.create({
            post_id: postId,
            liked_by_user_id: userId,
        });
    }

    async findPostById(postId) {
        return await Post.findByPk(postId, {
            include: [
                {
                    model: User,
                    as: 'author',
                },
                {
                    model: User,
                    as: 'recipient',
                },
                {
                    model: Like,
                    as: 'likes',
                },
            ],
        });
    }  
}

module.exports = PostRepository;
