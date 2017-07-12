var express=require('express');
var path=require('path');
var cookieparser=require('cookie-parser');
var bodyparser=require('body-parser');
var expresshandlebars=require('express-handlebars');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var mongo=require('mongodb');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/himadvent');
var db=mongoose.connection;
var users=require('./routes/users');
var routes=require('./routes/index');
var app=express();
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',expresshandlebars({defaultLayout:'layout'}));
app.set('view engine','handlebars');
app.get('/',function(req,res){
     res.render('home');

})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true
  
}));
app.use(passport.initialize());;
app.use(passport.session());
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(flash());
app.use(function(req,res,next){
	res.locals.success_mgs=req.flash('success_mgs');
	res.locals.error_msg=req.flash('error_msg');
	res.locals.error=req.flash('error');
	next();
});
app.use('/',routes);
app.use('/users',users);

app.set('port',(process.env.PORT||3000));
app.listen(app.get('port'),function(){
	   console.log('Server started on port'+app.get('port'));
});