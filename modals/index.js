var mongoose=require('mongoose');
var DetailsSchema= new mongoose.Schema({
	location:{
		type:String,
		index:true
	},
	type:{
		type:String
	},
	dob:{
		type:Date
	},
	date:{
        type:Date
	},
	slot:{
		type:String
	},
	username:{
		type:String,
		index:true
	},
	lastname:{
		type:String
	},
	email:{
		type:String
	},
	firstname:{
		type:String
	}
},{collection:'details'});
var Details=module.exports=mongoose.model('Details',DetailsSchema);
module.exports.createDetails=function(newdetails,callback){
        newdetails.save(callback);
}