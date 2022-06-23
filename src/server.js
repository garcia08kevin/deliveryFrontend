
let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/angular-biblioteca'));

app.get('/*', (req, resp) =>{
    resp.sendFile(__dirname+'./angular-biblioteca/dist/index.html');
});

app.listen(process.env.PORT || 8080);