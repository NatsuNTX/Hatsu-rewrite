/* Get Client Class */
const hatsuku = require('./Hatsuku/main');
// .env Files Config
require("dotenv").config()
//Run
new hatsuku(null ,process.env.TOKEN)