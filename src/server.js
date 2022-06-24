
let express = require('express');

let app = express();

app.use(express.static(__dirname+'src'));

app.get('/*', (req, resp) =>{
    resp.sendFile(__dirname+'src/index.html');
});

app.listen(process.env.PORT || 8080);