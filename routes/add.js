const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb.sqlite3');

router.get('/',(req,res,next) => {
    var data = { 
        title:'Hello/Add',
        content:'新しいレコード'
    }
    res.render('add',data);
});
router.post('/',(req,res,next) => {
    const qu=req.body.question;
    console.log(qu);
    db.serialize(() => {
        db.run('insert into noanswer (question,answer) values (?,?)',
        qu,qu);
    });
    res.redirect('/noanswer');
});
module.exports = router;