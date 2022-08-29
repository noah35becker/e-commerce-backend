
// IMPORTS
const router = require('express').Router();
const {Product, Category, Tag, ProductTag} = require('../../models');
const {Op} = require('sequelize');



// findOneProduct function
async function findOneProduct(productId){
    return await Product.findOne({
        where: {id: productId},
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: [
            {
                model: Category
            },
            {
                model: Tag,
                as: 'tags',
                attributes: ['id', 'tag_name'],
                through: {
                    model: ProductTag,
                    attributes: []
                }
            }
        ]
    });
}



// REQUESTS

router.get('/', (req, res) => 
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: [
            {
                model: Category
            },
            {
                model: Tag,
                as: 'tags',
                attributes: ['id', 'tag_name'],
                through: {
                    model: ProductTag,
                    attributes: []
                }
            }
        ]
    }).then(dbProductsData => res.json(dbProductsData))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.get('/:id', (req, res) => 
    findOneProduct(req.params.id)
    .then(dbProductData => {
        if (!dbProductData){
            res.status(404).json({message: 'No product found with this ID'});
            return;
        }
        res.json(dbProductData);
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.post('/', async (req, res) => {
    try{
        const newProductNoTagData = await Product.create(req.body); // {product_name: '', price: #.##, stock: #, category_id: #, OPTIONAL tagIds: [#, #, ...]}

        // If necessary, populate ProductTag through-table with new relationships
        if (req.body.tagIds && req.body.tagIds.length){
            const productTagIdArr = req.body.tagIds
                .sort((a, b) => a - b) // sort Tag IDs in asc order
                .map(tagId => {
                    return {
                        product_id: newProductNoTagData.id,
                        tag_id: tagId
                    };
                });
            await ProductTag.bulkCreate(productTagIdArr);
        }

        const newProductWithTagData = await findOneProduct(newProductNoTagData.id);
        res.json(newProductWithTagData);
    }catch(err){
        console.error(err);
        res.status(400).json(err);
    }
});


router.put('/:id', async (req, res) => {
    try{
        let result = await Product.update(
            req.body, // {product_name: '', price: #.##, stock: #, category_id: #, OPTIONAL tagIds: [#, #, ...]}
            {where: {id: req.params.id}}
        );
        let wasSuccessful = result[0] === 1;

        if (req.body.tagIds){
            const productTags = await ProductTag.findAll({where: {product_id: req.params.id}}); // Get array of ProductTags for this product only
            const submittedTagIds = req.body.tagIds.sort((a, b) => a - b); // sort in asc order
                
            // Get array of new ProductTags
            const currentTagIdsOfProduct = productTags.map(({tag_id}) => tag_id);
            const newProductTags = submittedTagIds
                .filter(tagId => !currentTagIdsOfProduct.includes(tagId))
                .map((tagId) => {
                    return {
                        product_id: req.params.id,
                        tag_id: tagId
                    };
                });
            
            // Get array of now-unused ProductTags
            const productTagsToRemove = productTags
                .filter(({tag_id}) => !submittedTagIds.includes(tag_id))
                .map(({id}) => id);

            // Add new ProductTags + remove unused ProductTags if needed
            if (newProductTags.length || productTagsToRemove.length){
                await Promise.all([
                    ProductTag.destroy({where: {id: {[Op.or]: productTagsToRemove}}}),
                    ProductTag.bulkCreate(newProductTags)
                ]);
                wasSuccessful = true;
            }
        }

        if (wasSuccessful)
            res.json({message: 'success'});
        else
            res.status(400).json({message: "No category found with this ID; or, no 'real' updates actually submitted; or, object attributes are missing from body of request"});
    }catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});
    

router.delete('/:id', (req, res) => 
    Product.destroy({where: {id: req.params.id}})
    .then(wasSuccessful => {
        if (!wasSuccessful){
            res.status(404).json({message: 'No product found with this ID'});
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