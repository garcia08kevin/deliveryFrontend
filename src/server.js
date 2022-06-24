
let express = require('express');

let app = express();

app.use(express.static(path.join(__dirname, 'dist','angular-biblioteca')));
res.sendFile(path.join(__dirname,'dist','angular-biblioteca','index.html'));

app.listen(process.env.PORT || 8080);