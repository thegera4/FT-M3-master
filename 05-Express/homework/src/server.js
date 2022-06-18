// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let prevId = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post("/posts/author/:author", (req, res) => {
    const { author } = req.params;
    const post = req.body;
    if(!author || !post.title || !post.contents){
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        })
    }
    const NEW_POST = {
        id: ++prevId,
        author,
        title: post.title,
        contents: post.contents
    }
    posts.push(NEW_POST);
    return res.json(NEW_POST);
});

server.post("/posts", (req, res) => {
    const post = req.body;

    if(!post.author || !post.title || !post.contents){
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        })
    }
    post.id = ++prevId;
    posts.push(post);
    return res.json(post);
});

server.get("/posts/:author/:title", (req, res) => {
    const { author, title } = req.params;
    const RESULT = posts.filter((post) => (post.author === author) && (post.title === title));
    return RESULT.length !== 0 ? res.json(RESULT) : res.status(STATUS_USER_ERROR).json({
        error: "No existe ningun post con dicho titulo y autor indicado"
    });
});

server.get("/posts/:author", (req, res) => {
    const { author } = req.params;
    const result = posts.filter((post) => post.author === author);
    return result.length !== 0 ? res.json(result) : res.status(STATUS_USER_ERROR).json({
        error: "No existe ningun post del autor indicado"
    });
});

server.get("/posts", (req, res) => {
    if(req.query.term){
        const result = posts.filter((post) => post.title.includes(req.query.term) || post.contents.includes(req.query.term))
        return res.json(result)
    }
    return res.json(posts);
});

server.put("/posts", (req, res) => {
    const { id, title, contents } = req.body;

    if(!id || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para modificar el Post"
        })
    }
    
    const post = posts.find((post) => post.id === id);

    if(!post){
        return res.status(STATUS_USER_ERROR).json({
            error: "El id no corresponde con un Post existente"
        })
    }

    post.title = title;
    post.contents = contents;

    return res.json(post);
})

server.delete("/posts", (req, res) => {
    const { id } = req.body;

    if(!id){
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibiero ID necesario para eliminar el Post"
        })
    }

    const post = posts.find((post) => post.id === id);

    if(!post){
        return res.status(STATUS_USER_ERROR).json({
            error: "El id no corresponde con un Post existente"
        })
    }

    posts = posts.filter((post) => post.id !== id);

    return res.json({success: true});

});

server.delete("/author", (req, res) => {
    const { author } = req.body;

    if(!author){
        return res.status(STATUS_USER_ERROR).json({
            error: "No existe el autor indicado"
        })
    }

    const POST_AUTHOR = posts.filter((post) => post.author === author);

    if(POST_AUTHOR.length === 0){
        return res.status(STATUS_USER_ERROR).json({
            error: "No existe el autor indicado"
        })
    }

    posts = posts.filter((post) => post.author !== author);

    return res.json(POST_AUTHOR);

})




module.exports = { posts, server };
