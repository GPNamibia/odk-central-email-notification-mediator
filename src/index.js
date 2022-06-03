require('dotenv').config();
const express = require("express");
const ebsData = require('./sendEmail/send-email.js');
const privateConfig = require('./config/private-config.json');
const { getQueryParameters } = require('./openHIM/initialize');
const db = require('./models');
const app = express();

// openHIM
getQueryParameters();

app.all('*', async(req, res) => {
    // Starts when a new request is triggered by the polling channel
    console.log(`\n---------------------------------------------------------------------------------`,
        `\n${ new Date().toUTCString('en-GB', { timeZone: 'UTC' }) }  - `,
        `The ODK Central EBS has received a new request. \n`
    );
    ebsData.getEbsData()
        .then((results) => {
            try {
                res.json('EBS Data from ODK Central retrieved.')
            } catch (error) {
                console.error(`Error retrieving EBS Data from ODK Central: ${error}`)
            }

        }).catch(error => { console.error(`Error retrieving EBS Data: ${error}`) })
});
//ebsData.getEbsData();

//Server PORT
db.sequelize.sync({}).then((req) => {
    app.listen(privateConfig.appConfig.PORT, (err) => {
        if (err) console.log(`Error: ${err}`)
        console.log(`${privateConfig.appConfig.mediatorName}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
    });
}).then(() => {
    console.log(`Succesfully connected to '${privateConfig.development.database}' database...  \n`)
}).catch(err => { console.log(`Error when connecting to '${privateConfig.development.database}' database...:: \n`, err) });