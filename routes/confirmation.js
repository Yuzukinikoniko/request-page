const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb.sqlite3');

router.get('/',(req,res,next) => {
    res.redirect('confirmation');
    
});
router.post('/',(req,res,next) => {
    const tm = req.body.time;
    const ct = req.body.count;
    const nm = req.body.name;
    const id = req.body.id;
    const tl = req.body.number;    
    const q = "update reserve set count = ?";
    db.serialize(() => {
        db.run('insert into address (name,id,number,time) values (?,?,?,?)',
        nm,id,tl,tm);
    })
    var data = { 
        title:'Hello/Add',
        content:'新しいレコード'
    }
    res.render('add',data);
});
module.exports = router;