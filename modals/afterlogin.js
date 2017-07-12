var mongoose=require('mongoose');
var LocSchema= new mongoose.Schema({
	location:{
		type:String,
		index:true
	},
	type:{
		type:String
	},
	charges:{
		type:Number
	},
	slots:{
		type:Number

	}
},{collection:'locs'});
var Loc=module.exports=mongoose.model('Loc',LocSchema);
module.exports.getchargesandslots=function(location,callback){
	var query={location:location};
	Loc.findOne(query,callback);
}


