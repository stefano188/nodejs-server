const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    console.log('request', req);
    res.send('Ciao LCS GET!');
});

router.post('/', (req, res) => {
    
    console.log('request headers', req.headers);
    console.log('request body', req.body);

    const data = req.body['data'];
    const params = data['PARAMS'];
    const message = params['MESSAGE'];

    console.log('data', data);
    console.log('params', params);
    console.log('message', message);

    res.send('Ciao LCS POST !');
});


module.exports = router;