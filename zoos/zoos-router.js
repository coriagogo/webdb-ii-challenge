const knex = require('knex');

const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('zoos')
        .then(zoos => {
        res.status(200).json(zoos);
        })
        .catch(error => {
        res.status(500).json(error);
        })
})

router.get('/:id', (req, res) => {
    db('zoos')
        .where({ id: req.params.id })
        .then(zoos => {
            res.status(200).json(zoos);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.post('/', (req, res) => {
    db('zoos')
        .insert(req.body, 'id')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('zoos')
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if(count > 0){
                const unit = count > 1 ? 'records' : 'record';
                res.status(200).json({ message: `${count} ${unit} updated` })
            } else {
                res.status(404),json({ message: 'Zoo not found' })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.delete('/:id', (req, res) => {
    db('zoos')
        .where({ id: req.params.id })
        .delete()
        .then(count => {
            if(count > 0){
                const unit = count > 1 ? 'records' : 'record';
                res.status(200).json({ message: `${count} ${unit} deleted` })
            } else {
                res.status(404),json({ message: 'Zoo not found' })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = router;