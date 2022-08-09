

const mysql = require("mysql")
const bcrypt = require("bcrypt")


const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
    })

exports.register = (req,res)=>{
    res.render("user_register")
}

exports.stores = (req,res)=>{
   pool.getConnection((err,connection)=>{
    if (err) throw err

     const {username,email,password}= req.body;
     const saltRounds = 10;
     const salt = bcrypt.genSaltSync(saltRounds);
     const hash = bcrypt.hashSync(password,salt);
     var sql = `INSERT INTO users SET username=?,email=?,password=?`;

     connection.query(sql,[username,email,hash],(err,result)=>{
        connection.release()
        if (!err){
            res.redirect("/")
        }else{
            if (err) throw err
        }
     })
   })
}