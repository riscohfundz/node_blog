

const mysql = require("mysql")

const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
    })

exports.index = (req, res) =>{
    
   pool.getConnection((err,connection)=>{
      if (err) throw err
      console.log(`we are connected ID: ${connection.throwID}`);
      var sql = `SELECT * FROM node_apps`
      console.log(sql);
      connection.query(sql,(err,post)=>{
         connection.release()
         if (!err){
            res.render('index',{post})
         }else{
            throw err
         }
        console.log(`data created from post table :\n`, post);
      })

   })

    }

 exports.about = (req, res)=>{

    res.render("about")
 }

 exports.post = (req, res)=>{
    
    res.render("post")
 }

 exports.contact = (req, res)=>{
    
    res.render("contact")
 }

