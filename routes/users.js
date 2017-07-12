var express=require('express');
var router=express.Router();
var User=require('../modals/users');
var passport=require('passport');
var Loc=require('../modals/afterlogin');
var Details=require('../modals/index');
var LocalStrategy=require('passport-local').Strategy;
router.get('/register',function(req,res){
	res.render('register');
});
router.get('/login',function(req,res){
	res.render('login');
});
router.get('/afterlogin',function(req,res){
  res.render('afterlogin');
});
router.get('/mid',function(req,res){
  var basic={location:location2,date:date,type:type,amount:amount};
  console.log(basic);
  res.render('mid',{basic:basic,table:check});
  var next2=1;
  while(next2<=number){
    console.log(check[next2]);
    next2=next2+1;
  }
});
var decision;
var next=1;
router.get('/details',function(req,res){
     Loc.getchargesandslots(location2,function(err,loc){
      if(err)throw err;
      amount=(loc.charges*number);
      decision=loc.slots;
      console.log(decision);
      console.log(next);
      console.log(number);
      console.log('Start');
      res.render('details',{decision:decision});
    });
});
router.get('/mid',function(req,res){

});
var check=[number];
router.post('/details',function(req,res){
       if(next<=number){
           console.log(next);
           var firstname=req.body.firstname;
           var lastname=req.body.lastname;
           var dob=req.body.dob;
           var slot=req.body.slot;
           console.log(firstname);
           req.checkBody('firstname','Enter the firstname').notEmpty();
           req.checkBody('lastname','Enter the lastname').notEmpty();
           req.checkBody('dob','Enter the date of birth').notEmpty();
           req.checkBody('slot','Enter the valid slot').notEmpty();
           var errors=req.validationErrors(); 
          if(errors){
          res.render('details',{
          errors:errors,
          decison:decison
          });}
          else{
            var newDetails=new Details({
            email:email,
            username:username,
            firstname:firstname,
            lastname:lastname,
            dob:dob,
            slot:slot,
            location:location2,
            type:type,
            date:date
            });
            newDetails.save(function (err) {
                 if(err) console.log(err);
            });
            check[next]=newDetails;
            
          }
          next=next+1;
          if(next<=number){
          res.redirect('/users/details');
          }
          if(next>number){
           res.redirect('/users/mid');
          }
    }
});
var location2;
var date;
var number;
var type;
router.post('/afterlogin',function(req,res){
   type=req.body.type;
   location2=req.body.location;
   date=req.body.date;
   number=req.body.number;
   req.checkBody('type','Please Enter the details').notEmpty();
   req.checkBody('location','Please Enter the details').notEmpty();
   req.checkBody('date','Please Enter the details').notEmpty();
   req.checkBody('number','Enter the valid number of person').notEmpty();
   console.log(location2);
   console.log(date);
   console.log(number);
   res.redirect('/users/details');
});
var email;
var username;
router.post('/register',function(req,res){
	var name=req.body.name;
  email=req.body.email;
  username=req.body.username;
	var password=req.body.password;
	var password2=req.body.password2;
	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('email','Enter valid email').isEmail();
	req.checkBody('username','Enter username').notEmpty();
 	req.checkBody('password','Enter the password').notEmpty();
	var errors=req.validationErrors(); 
	if(errors){
		res.render('register',{
			errors:errors
	});}
	else{
		   var newUser=new User({
		   	name:name,
		   	email:email,
		   	username:username,
		   	password:password
		   });
		   User.createUser(newUser,function(err,user){
		   });
		   res.redirect('/users/login');
     }
});
passport.use(new LocalStrategy(
  function(username, password, done) {
      User.getUserByUsername(username,function(err,user){
    	if(err)throw err;
    	if(!user){
    		return done(null,false,{message:'Unkown user'});
    	}
      console.log(user.password);
      console.log(user.username);
      User.comparePassword(password,user.password,function(err,isMatch){
    	if(err) throw err;
    	if(isMatch){
    		return done(null,user);

    	}
    	else{
    		return done(null,false,{message:'Invalid Password'});
    	}
    });
    });
  }));
router.post('/login',
  passport.authenticate('local',{successRedirect:'/users/afterlogin',failureRedirect:'/users/login',failureFlash:true}),
  function(req, res) {
  	res.redirect('/users/afterlogin');
  });
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users/login');
});
module.exports=router;
