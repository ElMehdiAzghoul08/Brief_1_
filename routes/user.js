const express = require('express')

const user_services_ = require('../services/user_post')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const response = await user_services_.getUser()
        console.log(response.data);
        res.json(response.data.slice(0, 10));
    } catch (error) {
        res.status(500).send('Server error');
    }
})


router.get('/:id/posts', async (req, res) => {
    try {
      const userId = await req.params.id;
      console.log(userId);
      const user_res = await user_services_.getUserId(userId);
      const post_res = await user_services_.getPosts();
      const user_post = await post_res.data.filter(post => post.userId === userId);
      console.log(user_post);
      res.json({ user: user_res.data, posts: user_post });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });
  


module.exports = router