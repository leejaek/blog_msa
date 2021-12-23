const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

// commentsByPostId: Key: PostId, Value: comments 객체 배열
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // comments 변수에 commentsByPostId에서 PostId 키 값으로 찾아온 Value의 배열 혹은 없다면 빈 배열을 넣는다.
    const comments = commentsByPostId[req.params.id] || [];
    // comments 배열에 새로운 comments 객체를 추가한다.
    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on port 4001');
})