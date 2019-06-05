const knex = require('knex');

const router = require('express').Router();

const Bears = require('./bears-model.js');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);

router.get('/', (req, res) => {
    Bears.find()
        .then(bears => {
        res.status(200).json(bears);
        })
        .catch(error => {
        res.status(500).json(error);
        })
})

router.get('/:id', (req, res) => {
    Bears.findById(req.params.id)
        .then(bears => {
            res.status(200).json(bears);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.post('/', (req, res) => {
    Bears.add(req.body)
        .then(bear => {
            res.status(201).json(bear);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.put('/:id', (req, res) => {
    Bears.update(req.params.id, req.body)
        .then(count => {
            if(count > 0){
                const unit = count > 1 ? 'records' : 'record';
                res.status(200).json({ message: `${count} ${unit} updated` })
            } else {
                res.status(404),json({ message: 'Bear not found' })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.delete('/:id', (req, res) => {
    Bears.remove(req.params.id)
        .then(count => {
            if(count > 0){
                const unit = count > 1 ? 'records' : 'record';
                res.status(200).json({ message: `${count} ${unit} deleted` })
            } else {
                res.status(404),json({ message: 'Bear not found' })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = router;