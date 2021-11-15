const router = require('express').Router();
const AuthController = require('./controllers/authController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);
router.get("/users/:id", userController.getUser);
router.post("/upload", userController.update);
router.post("/posts/", postController.createPost);
router.put("/posts/:id", postController.update);
router.delete("/posts/:id", postController.delete);
router.get("/posts/:id", postController.getPost);
router.get("/posts/", postController.getAllPosts);
router.post("/categories/", categoryController.createCategory);
router.get("/categories/", categoryController.getCategory);

module.exports = router;
