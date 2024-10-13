const Post = require("../models/Post");
const User = require("../models/User");
const Company = require("../models/Company");
const Like = require("../models/Like"); 

class PostRepository {
    async createPost(post) {
        return await Post.create(post);
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
}

module.exports = PostRepository;
