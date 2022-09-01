var express=require("express");
var Class=require("../models/class");
var Teacher=require("../models/teacher");
var Student=require("../models/student");
var router=express.Router();
//Get routes
router.get('/',function(req,res,next){
    res.send("This is admin Dashboard");
});

router.get('/classes',function(req,res,next){
    Class.find().populate('teacher').populate('students.sid').exec(function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    })
});

router.get('/teachers',function(req,res,next){
    Teacher.find().exec(function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    })
});

router.get('/students',function(req,res,next){
    Student.find().exec(function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    })
});

router.get('/students/:sid',function(req,res,next){
    //req.params.sid
    // res.send("Specific Student info");
    Student.findById(req.params.sid).then((student)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    },err=>next(err))
    .catch((err)=>next(err));
});

router.get('/classes/:cid',function(req,res,next){
    Class.findById(req.params.cid).populate('teacher').populate('students.sid').then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    },err=>next(err))
    .catch((err)=>next(err));
});

router.get('/teachers/:tid',function(req,res,next){
    Teacher.findById(req.params.tid).then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    },err=>next(err))
    .catch((err)=>next(err));
});

//POST Routers
//Postman software
router.post('/addteacher',function(req,res,next){
    Teacher.create(req.body).then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    },err=>next(err))
    .catch((err)=>next(err));
});

router.post('/addstudent',function(req,res,next){
    Student.create(req.body).then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    },err=>next(err))
    .catch((err)=>next(err));
});

router.post('/addclass',function(req,res,next){
    //Promise 2nd method callback
    Class.create(req.body).then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    },err=>next(err))
    .catch((err)=>next(err));
});

//PUT Routes
router.put('/editteacher/:tid',function(req,res,next){
    res.send('editing a teacher');
});

router.put('/editclass/:cid',function(req,res,next){
    res.send('editing a class');
});

router.put('/editstudent/:sid',function(req,res,next){
    res.send('editing a student');
});

router.put('/assignteacher/:tid/:cid',function(req,res,next){
    Class.findOneAndUpdate({_id:req.params.cid},{teacher:req.params.tid},function(err,result,next){
        if (err){
            return next(err);
        }
        res.json(result);
    });
});

router.put('/assignstudent/:cid/:sid',function(req,res,next){
    Class.findOneAndUpdate({_id:req.params.cid},
    {
        "$push":{
            "students": {
                "sid": req.params.sid
            }
        }
    }, { new: true, upsert: false}
    ,function(err,result,next){
        if (err){
            return next(err);
        }
        res.json(result);
    });
});

//Delete 
router.delete("/class/:cid",function(req,res,next){
    //Callback
    Class.deleteOne({_id:req.params.cid},function(err,result){
        if (err) {
            return next(err);
        }
        //Deleted object show
        res.json(result);
    });
});

router.delete("/teacher/:tid",function(req,res,next){
    Teacher.deleteOne({_id:req.params.tid},function(err,result){
        if (err) {
            return next(err);
        }
        //Deleted object show
        res.json(result);
    });
});

router.delete("/student/:sid",function(req,res,next){
    Student.deleteOne({_id:req.params.sid},function(err,result){
        if (err) {
            return next(err);
        }
        //Deleted object show
        res.json(result);
    });
});

module.exports=router