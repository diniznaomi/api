const { Router } = require('express');
const AuthenticationMiddleware = require('../api/middlewares/authentication');
const PostController = require('../api/controllers/PostController');
const schemaValidator = require('../api/middlewares/schemaValidator');
const postSchema = require('../schema/create.post.schema.json');

const router = Router();

router.use(AuthenticationMiddleware);

router.post('/', schemaValidator(postSchema), PostController.createPost);
router.get('/:id', PostController.listPostsByCompany);
router.post('/:postId/like',  PostController.likePost);

module.exports = router;