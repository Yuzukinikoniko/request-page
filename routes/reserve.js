const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb.sqlite3');

router.get('/',(req,res,next) => {
    console.log("aaaa");
    db.serialize(() => {
        db.all("select * from reserve",(err,rows) => {
            if (!err){
                var data = {
                    title:'Hello!',
                    reserve:rows
                }
                res.render('reserve',data);
            }
        });
    });    
});
router.post('/',(req,res,next) => {
    console.log("vvvvv");
    const time = document.getElementById("time").value;
    const count = document.getElementById("count").value;
    var data = {
        title:'Hello!',
        time:time,
        count:count
    }
    console.log(time);
    console.log(count);
    res.render('confirmation',data);
    console.log("aaaaa")
});
module.exports = router;