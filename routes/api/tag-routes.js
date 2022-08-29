
// IMPORTS
const router = require('express').Router();
const {Tag, Product, ProductTag} = require('../../models');



// REQUESTS

router.get('/', (req, res) =>
    Tag.findAll({
        include: {
            model: Product,
            as: 'products',
            attributes: ['id', 'product_name'],
            through: {
                model: ProductTag,
                attributes: []
            }
        },
        order: [['id', 'ASC']]
    }).then(dbTagsData => res.json(dbTagsData))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.get('/:id', (req, res) =>
    Tag.findOne({
        where: {id: req.params.id},
        include: {
            model: Product,
            as: 'products',
            attributes: ['id', 'product_name'],
            through: {
                model: ProductTag,
                attributes: []
            }
        }
    }).then(dbTagData => {
        if (!dbTagData){
            res.status(404).json({message: `No tag found with ID:${req.params.id}`});
            return;
        }
        res.json(dbTagData);
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.post('/', (req, res) => 
    Tag.create(req.body) // {tag_name: ''}
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.error(err);
        res.status(400).json(err);
    })
);


router.put('/:id', (req, res) =>
    Tag.update(
        req.body, // {tag_name: ''}
        {where: {id: req.params.id}}
    ).then(([wasSuccessful]) => {
        if (!wasSuccessful){
            res.status(400).json({message: `No tag found with ID:${req.params.id}; or, no 'real' updates actually submitted`});
            return;
        }
        res.json({message: 'success'});
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.delete('/:id', (req, res) =>
    Tag.destroy({where: {id: req.params.id}})
    .then(wasSuccessful => {
        if (!wasSuccessful){
            res.status(404).json({message: `No tag found with ID:${req.params.id}`});
            return;
        }
        res.json({message: 'success'});
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);



// EXPORT
module.exports = router;