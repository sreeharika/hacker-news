const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 3000

//cross origin resoure sharing(cors) is middleware
app.use(cors())

// connect to database
const DATABSE_HOST = 'mongodb://localhost:27017'
const DATABASE_NAME = "myfirstdb"
mongoose.connect(`${DATABSE_HOST}/${DATABASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonparser = bodyParser.json()

app.use(jsonparser);
// home route
app.get('/', (req, res) => {
    res.send('Hello world')
})

//db model for post and user and schema 
const Post = mongoose.model('Post', { title: String, url: String, username: String, datemodified: Date });

const User = mongoose.model('User', { username: String, password: String });
const Upvote = mongoose.model('Upvote', {username: String, counter: Number });
// /login --POST -- payload will be username and password

// users
// /user  -- POST -- payload will be username and password(create user)
app.post('/user', (req, res) => {
    console.log(req.body);
    const user = new User({ username: req.body.username, password: req.body.password });
    user.save().then(() => {
        console.log('new  user added')
        res.status(200).send('new user added successfully')
    })
    .catch(err => {
        console.log(error);
        res.status(500).send("something broke!")
    });
})



// posts
// /article -- POST -- payload will be title and url --- (create post)
app.post('/post', urlencodedParser, (req, res) => {

    // console.log(req.body.title);
    // console.log(req.body.url);
    // console.log(req.body.username);

    const post = new Post({
        title: req.body.title,
        url: req.body.url,
        username: req.body.username,
        datemodified: new Date()
    })
    post.save().then(() => {
        console.log('new post added');
        res.status(200).send('new post added')
    })
})
// /articles --- GET --- response should be array of articles[]
/**
 * [
 *      {
 *          name: string,
 *          url: string,
 *          username: string,
 *          timestamp: Date,
 *          upvotes: number,
 *          comments: [{
 *              text: string,
 *              username: string,
 *              timestamp: date
 *          }]
 *      }
 * ]
 */
app.get('/posts', (req, res) => {
    // Post.find({}, (err, postsFromDB) => {
    //     console.log(postsFromDB);
    //     res.status(200).send(postsFromDB)
    // });
    Post.find({}).then((postsFromDB)=>{
        console.log(postsFromDB);
        res.status(200).send(postsFromDB)
    })
})

app.post('/upvote',(req,res)=>{
    const Upvote = new Upvote({username: req.body.username, count: req.body.counter});           
    const counter = action === 'upvote' ? 1 : -1;
        Post.update({_id: req.params.id}, {$inc: {likes_count: counter}}, {}, (err, numberAffected) => {
            res.send('');
        });
    // post.find({}).then(upvoteFromDB);
    // res.status(200).send(upvoteFromDB);
});

app.get('/userlist', (req,res)=>{
    User
      .find({})
      .then(data => {
          res.status(200).json(data);
      })
      .catch(err =>{
          res.status(500).send("went wrong")
      })
})

// /comment --- POST --- payload will be comment text, user id, timestamp

// /upvote --POST  -- payload will be username

app.listen(port, () => console.log(`Example app listening on port ${port}!`))