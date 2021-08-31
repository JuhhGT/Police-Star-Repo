const express = require('express')
const server = express();
 
server.all('/', (req, res) => {
    res.send('Team Star!');
});
 
function keepAlive() {
   server.listen(3000, () => { console.log("Shinin' ready." + Date.now()) });
}

module.exports = keepAlive;