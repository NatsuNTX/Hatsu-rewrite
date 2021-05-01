/* Use For Indicate That User Successfully Set Up Hatsuku */

//Stuff
const clr = require('chalk')
const express = require('express');
const http = new express();
const path = require('path'); //Use for Searching Directory
const {version} = require('../package.json');
const os = require('os');

function httpServer(ClientUser, ClientProfile) {

    //Port
    //Use Default Port From System or Use 5521 if Not Present
    const port = process.env.PORT || 5521

    /* RAM Calculation */
    const mem = os.totalmem / 1073741824


    //Use Ejs View Engine
    http.set('view engine', 'ejs')

    http.use(express.static(path.join(__dirname, 'public')));

    http.get('/', (req, res) => {
        //res.sendFile(path.join(__dirname, 'page/frontpage.html'))
        res.render('pages/frontpage');
    });
    http.get('/sysinfo', ((req, res) =>  {
        res.render('pages/sysinfo1', {B_Ver: version, B_NodeVer: process.version, SYS_Type: os.type, SYS_Arch: os.arch, SYS_CPU: os.cpus(1)[0].model, SYS_RAM: mem.toFixed(2), B_LoginAs: ClientUser, B_PrImage:ClientProfile})
    }))

//Listen to Specific Port
    http.listen(port);
    console.log(clr.cyan(`Server Run on Port [${port}]`))
}

module.exports = httpServer