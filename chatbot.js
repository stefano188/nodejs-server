const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    console.log('request', req);
    res.send('Ciao LCS GET!');
});

router.post('/', (req, res) => {
    console.log('request', req);

    res.send('Ciao LCS POST !');
});


module.exports = router;