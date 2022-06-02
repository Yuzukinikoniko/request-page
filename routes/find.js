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
                    find:'',
                    content:'検索条件を入力してください。',
                    qanda:rows
                }
                res.render('find',data);
            }
        });
    });
    
});
router.post('/',(req,res,next) => {
    var find = req.body.find;
    const c1 = find.split(/\s/);
    db.serialize(() => {
        var q = "select * from qanda where question like \"%";
        var p = "%\"";
        db.all(q + find + p, [],　(err,rows) => {
            if (!err) {
                var data = {
                    title:'Hello/find',
                    find:find,
                    content:'"' + find + '"' + "の検索結果",
                    qanda:rows
                }             
                res.render('find',data);
            }
        });
    });
});
module.exports = router;