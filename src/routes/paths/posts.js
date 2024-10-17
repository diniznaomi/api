const { Router } = require('express');
const AuthenticationMiddleware = require('../../api/middlewares/authentication');
const PostsController = require('../../api/Posts/PostsController');
const schemaValidator = require('../../api/middlewares/schemaValidator');
const postSchema = require('../../api/Posts/schema/create.post.schema.json');

const router = Router();

router.use(AuthenticationMiddleware);

router.post('/', schemaValidator(postSchema), PostsController.createPost);
router.get('/:id', PostsController.listPostsByCompany);
router.post('/:postId/like',  PostsController.likePost);

module.exports = router;