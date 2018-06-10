var express = require("express");
var app = express();
var path = require("path");
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
const server = app.listen(5000);
const io = require('socket.io')(server);

app.get('/', function(req, res){
    console.log('===> SERVER > "/" ');
    res.render('index');
})

var epic_var = 0;
io.on('connection', function (socket) {

    
    //initial emit
    io.emit('epic_init', {epic_var:epic_var});

    //listen for client btn press
    socket.on('epic', function(){
        console.log('reveived client btn press'); 
        epic_var++;
        console.log('epic_var => after client press=>', epic_var);
        //send client the updated epic btn var
        io.emit('epic_var', { epic_var: epic_var });
        console.log('server emmit epic_var => ', epic_var);
    })

    //listen for reset from client
    socket.on('reset', function(){
        epic_var = 0;
        console.log('RESET ->', epic_var);
        io.emit('epic_var', { epic_var: epic_var });
    })


});