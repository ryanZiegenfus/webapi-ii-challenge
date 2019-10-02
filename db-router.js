const express = require('express');

const router = express.Router();

router.use(express.json());

const dataModel = require('./data/db.js')

router.get('/', (req, res) => {
    dataModel
    .find()
    .then(data => {
        res.send(data)
    }).catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    });
})

router.get('/:id', (req, res) => {

    const id = req.params.id;

    dataModel
        .findById(id)
        .then(data => {
            (data.length === 0) ? res.status(404).json({ message: "The post with the specified ID does not exist." })
            : res.send(data)
        }).catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        });
})

router.get('/:id/comments', (req, res) => {

    const id = req.params.id;

    dataModel
        .findCommentById(id)
        .then(data => {
            (data.length === 0) ? res.status(404).json({ message: "The post with the specified ID does not exist." })
            : res.send(data)
        }).catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        });
})

router.post('/', (req, res) => {

    const Data = req.body;

    (!Data.title || !Data.contents) ? res.status(400).json({ errorMessage: "Please provide title and contents for the comment." })
    :dataModel
        .insert(Data)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        });
});


router.post('/:id/comments', (req, res) => {

    const Data = req.body;
    const id = req.params.id;

    !Data.text ? res.status(400).json({ errorMessage: "Please provide text for the comment." })
    : dataModel
        .insertComment(Data)
        .then(data => {
            !data ? res.status(404).json({ message: "The post with the specified ID does not exist." })
            :res.status(201).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        });
});

router.delete('/:id', (req, res) => {

    const id = req.params.id;

    dataModel
        .remove(id)
        .then(data => {
            !data ? res.status(404).json({ message: "The post with the specified ID does not exist." })
            :res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed"})
        })
})
router.put('/:id', (req, res) => {

    const id = req.params.id;
    const Data = req.body;

    (!Data.title || !Data.contents) ? res.status(400).json({ errorMessage: "Please provide title and contents for the comment." })
    :dataModel
        .update(id, Data)
        .then(data => {
            !data ? res.status(404).json({ message: "The user with the specified ID does not exist." })
            : res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be modified"})
        })
})
// !Data.text ? res.status(400).json({ errorMessage: "Please provide text for the comment." })
// : 
// Data.post_id, Data.text
module.exports = router