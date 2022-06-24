
let express = require('express');

let app = express();

app.use(express.static(path.join(__dirname, 'dist','app_name')));
res.sendFile(path.join(__dirname,'dist','app_name','index.html'));

app.listen(process.env.PORT || 8080);