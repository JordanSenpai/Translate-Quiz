    
  //////////////
 // Requires //
//////////////
var express         = require('express');
var bodyParser      = require('body-parser');
var googleTranslate = require('google-translate')("AIzaSyC0mw4NLJ7pP3LBhu7zBuis_Xg17GJWxAk")


  ////////////////////////
 // Express App Object //
////////////////////////
var app = express();


///////////////////////////////
// Application Configuration //
///////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


////////////
// Routes //
////////////
app.get('/', function(req, res){
  res.sendFile("translate.html", {root: './public'})
});

app.get('/quiz', function(req, res){
  res.sendFile("quiz.html", {root: './public'})
});

app.post('/submit', function(req, res) {
	googleTranslate.translate(req.body.word, req.body.trLanguage, function(err, translation) {
  	console.log(translation.translatedText);
  	res.send(translation.translatedText)
	});
})

app.post('/checkanswer', function(req, res) {
	googleTranslate.translate(req.body.word, req.body.endlang, function(err, translation) {
  	console.log(translation.translatedText);
  	res.send(translation.translatedText)
	});


})


///////////////////////////////////////////////////
// Creating Server and Listening for Connections //
///////////////////////////////////////////////////
var port = 8000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})