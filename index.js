const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const users = [];

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword)
    const user = {name: req.body.name, password: hashedPassword};
    users.push(user);
    res.status(201).send()
    bcrypt(password)
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if(user == null) {
    return res.status(400).send('Cannont find user')
  }
  try {
  if(await bcrypt.compare(req.body.password, user.password)){
    res.send('success')
  } else {
    res.status(400).send('not allowed')
  }}
    catch {
    res.status(500).send()
  }
})







//Create Connection
const db = mysql.createConnection({
  host : '35.226.80.232',
  user : 'root',
  password : 'JOHNfam2013@!',
  database : 'nodemysql'
});

//Connect
db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('mysql connected')
})



//Create db
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Database created...')
  })
})

//Create table
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(ID))'
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts table created...')
  })
})


// Insert post 1
app.get('/addpost1', (req, res) => {
  let post = {title: 'post one', body: 'This is post number one'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) =>  {
    if(err) throw err;
    console.log(result);
    res.send('Posts one added')
  })
})

// Insert post 2
app.get('/addpost2', (req, res) => {
  let post = {title: 'post two', body: 'This is post number two'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) =>  {
    if(err) throw err;
    console.log(result);
    res.send('Posts two added')
  })
})


//Select Posts
// Insert post 1
app.get('/getposts', (req, res) => {
  let post = {title: 'post one', body: 'This is post number one'};
  let sql = `SELECT * FROM posts WHERE ID`;
  let query = db.query(sql, (err, results) =>  {
    if(err) throw err;
    console.log(results);
    res.send('Post fetched')
  })
})


//update Posts
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) =>  {
    if(err) throw err;
    console.log(results);
    res.send(`id:${req.params.id} has been updated`)
  })
})

//delete post

app.get('/deletepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) =>  {
    if(err) throw err;
    console.log(results);
    res.send(`id:${req.params.id} has been deleted`)
  })
})




const port = process.env.PORT || 4001;

app.use(express.static('./'))



app.listen(port, () => console.log("**************lisenting on the port " + port)
)