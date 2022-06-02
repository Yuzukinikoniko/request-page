const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb.sqlite3');

router.get('/',(req,res,next) => {
    db.serialize(() => {
        db.all("select * from qanda",(err,rows) => {
            if (!err){
                var data = {
                    title:'Hello!',
                    content:rows
                };
                res.render('hello',data);
            }
        });
    });
});
router.get('/',(req,res,next) => {
    var data = {
        title:'Hello/Add',
        content:'新しいレコード'
    }
    res.render('add',data);
});
router.post('/',(req,res,next) => {
    const qu=req.body.question;
    db.serialize(() => {
        db.run('insert into qanda (question) values (?)',
        qu);
    });
    res.redirect('hello');
});

module.exports = router;