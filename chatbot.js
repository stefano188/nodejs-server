const express = require('express');
const axios = require('axios');

const router = express.Router();


router.get('/', (req, res) => {
    console.log('request', req);
    res.send('Ciao LCS GET!');
});

router.post('/', async (req, res) => {
    
    try {

    
        console.log('request headers', req.headers);
        console.log('request body', req.body);

        const data = req.body['data'];
        const params = data['PARAMS'];
        const message = params['MESSAGE'];

        console.log('data', data);
        console.log('params', params);
        console.log('message', message);

        const dialogId = params['DIALOG_ID'];
        const bot = data['BOT'];
        const clientId = req.query['CLIENT_ID'];


        console.log('clientId', clientId);
        console.log('dialogId', dialogId);
        console.log('BOT_ID', bot['BOT_ID']);
        console.log('BOT_CODE', bot['BOT_CODE']);


    //    https://dentista21.bitrix24.it/rest/117/tzsqzxuuzg93ocpg/imbot.message.add.json?BOT_ID=10&CLIENT_ID=20&DIALOG_ID=30&MESSAGE=Ciao! Sono un chat bot LCS!

        // Call an external API
        const urlPath = dialogId + "/" + bot['BOT_CODE'] + "/imbot.message.add.json?BOT_ID="+bot['BOT_ID']+"&CLIENT_ID="+clientId+"&DIALOG_ID"+dialogId+'&MESSAGE=OHLA!';
        console.log('urlPath', urlPath);
        const apiResponse = await axios.post('https://dentista21.bitrix24.it/rest/' + urlPath, {
            //key: 'value', // Add your payload here
            //...req.body   // Optionally include data from the request body
        });

        console.log('API Response:', apiResponse.data);
        res.json(apiResponse.data);

        res.send('Ciao LCS POST !\n');

    } catch(error) {
        console.error('Error calling API:', error.message);
        res.status(500).send('Error calling external API\n');
    }

});


module.exports = router;