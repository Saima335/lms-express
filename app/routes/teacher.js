var express=require("express");
var router=express.Router();
var Teacher=require("../models/teacher");

//Get routes
router.get('/',function(req,res,next){
    res.render('teacher.html');
    // res.send("This is teacher Dashboard");
});

router.get('/viewattquiz', function(req,res,next){
    res.send("View Attempted Quiz")
});

router.get('/quiz/:id',function(req,res,next){
    Teacher.findById(req.params.id).then((result)=>{
        var fs = require('fs');
        var zipName = result.baseDir + "jsd-" + result.name + ".zip";
        var fileArray = getDirectoryList(result.dir);
        var output = fs.createWriteStream(zipName);
        var archiver = require('archiver');
        var archive = archiver('zip');

        archive.pipe(output);

        fileArray.forEach(function(item){
            var file = item.path + item.name;
            archive.append(fs.createReadStream(file), { name: item.name });
        });

        archive.finalize(function(err, written) {
            if (err) {
                throw err;
            }
            // do cleanup
            cleanUp(dir);
        });

        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.download(zipName);
    },err=>next(err))
    .catch((err)=>next(err));
});

module.exports=router