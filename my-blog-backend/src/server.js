const express = require('express');
const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const admin = require('firebase-admin');

// import fs from 'fs';
// import path from 'path';
// import admin from 'firebase-admin';
// import express from 'express';

// import { MongoClient } from 'mongodb';
// import { db, connectToDb } from './db.js';

// const credentials = JSON.parse(
//     fs.readFileSync('../credentials.json')
// )

// admin.initializeApp({
//     credential: admin.credential.cert(credentials)
// });

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);  
    } else {
        res.sendStatus(404);
    }
    
})

app.put("/api/articles/:name/upvote", async (req, res) => {
    const { name } = req.params;

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('react-blog-db');

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 }
    });

    const article = await db.collection('articles').findOne({ name });


    if (article) {
        // res.send(`The super ${name} article now has ${article.upvotes} upvotes`);
        res.json(article);
    } else {
        res.send(`That article doesn't exist`);
    }
})

app.post("/api/articles/:name/comments", async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('react-blog-db');

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: {postedBy, text}}
    })

    const article = await db.collection("articles").findOne({ name });

    if (article) {
        // res.send(article.comments);
        res.json(article);
    } else {
        res.send(`That article doesn't exist`);
    }
})

console.log('Successful connect to database...')
    app.listen(port, ()=> console.log(`The server is listening on port ${port}.`))

// connectToDb(() => {
//     console.log('Successful connect to database...')
//     app.listen(port, ()=> console.log(`The server is listening on port ${port}.`))
// })


