/**
 * Created by tonny_yan on 11/10/2015.
 * node.js/express
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

//express server settings
app.set('port', (process.env.PORT || 3000));

//load express middleware
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routing
app.get('/api/comments', function(req, res){
    fs.readFile(COMMENTS_FILE, function(err, data){
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    })
});

app.post('/api/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(er) {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(comments);
        });
    });
});

app.listen(app.get('port'), function(){
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
