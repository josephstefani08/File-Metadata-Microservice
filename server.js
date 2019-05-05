'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

let uploadedFileName;
let size;

// require and use "multer"...

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  let uploadedFile = req.file
  
  if(!uploadedFile) {
    res.json({error: 'Please select a file to upload.'});
  }
  res.json({file_name: uploadedFile.originalname, size: uploadedFile.size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
