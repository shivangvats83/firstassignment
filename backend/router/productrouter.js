

const router = require('express').Router(); 

router.get('/', (_req , res) => {
    res.status(200).json([
        {
            name : "mobile",
            price : 100000
        },
        {
            name : "tv",
            price :20000
        }
    
    ]);
});
module.exports = router; 