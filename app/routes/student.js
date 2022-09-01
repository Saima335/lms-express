var express=require("express");
var router=express.Router();
//Get routes
router.get('/',function(req,res,next){
    res.send("This is student Dashboard");
});

module.exports=router