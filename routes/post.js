const express = require('express')
const multer = require('multer')
const user_services_ = require('../services/user_post')
const router = express.Router()
const fs = require('fs')

const upload = multer({ dest: 'public/images' });


router.post('/', async (req, res) => {
    try {
        const response = await user_services_.getPosts();
        const posts = response.data.slice(0, 10);
        fs.writeFile('data.json', JSON.stringify(posts, null, 2), (err) => {
            if (err) return res.status(500).send('Err');
            res.send('valid');
        });
    } catch (error) {
        res.status(500).send('server Error');
    }
});



router.get('/file', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Err');
        res.json(JSON.parse(data));
    });
});



  router.get('/:postId', (req, res) => {
    const postId = req.params.postId;
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) return res.status(500).send('Err');
      const posts = JSON.parse(data);
      const post = posts.find(p => p.id == postId);
      if (!post) return res.status(404).send('Post not founded');
      res.json(post);
    });
  });
  

router.post('/files', upload.single('file'), (req, res) => {
     res.send('File downloaded');
});

module.exports = router