const express = require('express');
const axios = require('axios');

const router = express.Router();


const sendReplyToBitrixChat = async (authToken, auth, botId, dialogId, message, replyMessage, latency) => {
    const url = 'https://dentista21.bitrix24.it/rest/imbot.message.add'; // Replace with your Bitrix24 domain

    const params = {
        BOT_ID: botId,
        DIALOG_ID: dialogId,
        MESSAGE: message,
        ATTACH: [
            { MESSAGE: `reply: ${replyMessage}` },
            { MESSAGE: `latency: ${latency}` }
        ]
    };

    try {
        console.log('imbot.message.add params', params);
        console.log('auth', auth);
        // const response = await axios.post(url, params, auth);
        const response = await axios.post(url, params, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        });
        // const response = await axios.post(url, params, {
        //     Authorization: `Bearer ${auth}`
        // });
        console.log('Reply sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending reply:', error.response ? error.response.data : error.message);
        throw error;
    }
};




router.get('/', (req, res) => {
    console.log('request', req);
    res.send('Ciao LCS GET!');
});

router.post('/', async (req, res) => {
    
    try {

    
        console.log('request headers', req.headers);
        console.log('request body', req.body);
        console.log('request body.auth', req.body.auth);

        const data = req.body['data'];
        const params = data['PARAMS'];
        const message = params['MESSAGE'];

        console.log('data', data);
        console.log('params', params);
        console.log('message', message);

        const dialogId = params['DIALOG_ID'];
        const toUserId = params['TO_USER_ID'];
        console.log('dialogId', dialogId);
        console.log('toUserId', toUserId);

        const clientId = req.query['CLIENT_ID'];
        console.log('clientId', clientId);
        
        const bot = data['BOT'][toUserId];
        const botId = bot['BOT_ID'];
        console.log('data.bot', bot);
        console.log('data.bot.BOT_ID', botId);
        console.log('data.bot.BOT_CODE', bot['BOT_CODE']);


        // Send the reply
        const authToken = req.body.auth;
        const result = await sendReplyToBitrixChat(clientId, authToken, botId, dialogId, message, 'replyMessage', 1);
        
        res.json({ success: true, data: result });

        // const handleRequest = async (req, res) => {
        //     try {
        //         const authToken = req.body.auth; // Authentication token from the request
        //         const dialogId = req.body.data.PARAMS.DIALOG_ID; // DIALOG_ID from the request
        //         const message = "Message from bot"; // Your bot's main message
        //         const replyMessage = req.body.data.PARAMS.MESSAGE; // Message to reply to
        //         const latency = req.body.latency || 'N/A'; // Optional latency value
        
        //         // Send the reply
        //         const result = await sendReplyToBitrixChat(authToken, dialogId, message, replyMessage, latency);
        
        //         res.json({ success: true, data: result });
        //     } catch (error) {
        //         res.status(500).json({ success: false, error: 'Error replying to chat' });
        //     }
        // };


  //    https://dentista21.bitrix24.it/rest/117/tzsqzxuuzg93ocpg/imbot.message.add.json?BOT_ID=10&CLIENT_ID=20&DIALOG_ID=30&MESSAGE=Ciao! Sono un chat bot LCS!

        // Call an external API
        // const urlPath = dialogId + "/" + bot['BOT_CODE'] + "/imbot.message.add.json?BOT_ID="+bot['BOT_ID']+"&CLIENT_ID="+clientId+"&DIALOG_ID"+dialogId+'&MESSAGE=OHLA!';
        // console.log('urlPath', urlPath);
        
        // const apiResponse = await axios.post('https://dentista21.bitrix24.it/rest/' + urlPath, {
        //     //key: 'value', // Add your payload here
        //     //...req.body   // Optionally include data from the request body
        // });

        // console.log('API Response:', apiResponse.data);
        // res.json(apiResponse.data);

        res.send('Ciao LCS POST !\n');

    } catch(error) {
        console.error('Error calling API:', error.message);
        res.status(500).send('Error calling external API\n');
    }

});




module.exports = router;