

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
      console.log(`we are connected ID: ${connection.threadId}`);
      // var sql = `SELECT * FROM node_apps`
      var sql = `SELECT node_apps.id, node_apps.user_id, node_apps.title, node_apps.subtitle, node_apps.content, node_apps.post_img, node_apps.created_at, users.username FROM node_apps LEFT JOIN (SELECT * FROM users) users ON (users.id = node_apps.user_id) Order By node_apps.created_at desc `
      // console.log(sql);
      connection.query(sql, async (err,post)=>{
         connection.release()
         // console.log(post);
         if (!err){
           await res.render("index",{
               post: post})
         }else{
            throw err
         }
      //   console.log(`data created from post table :\n`, post);
      })

   })

    }

  

 exports.about = (req, res)=>{

    res.render("about")
   
 }

      exports.post = (req, res)=>{
      pool.getConnection((err,connection)=>{
      if (err) throw err;
      const para = req.params.id
      // var sql = `SELECT * FROM node_apps WHERE id=?`
      var sql = `SELECT node_apps.id, node_apps.user_id, node_apps.title, node_apps.subtitle, node_apps.content, node_apps.post_img, node_apps.created_at, users.username FROM node_apps
      LEFT JOIN (SELECT * FROM users) users
      ON (users.id = node_apps.user_id)
       WHERE node_apps.id LIKE ? `

      connection.query(sql,  ['%' + para + '%'],async(err,post)=>{
      connection.release()
      if (!err){
      user_id = req.session.userId
      return await res.render("post",{post:post[0], user_id})
      }else{
      throw err;
      }

     })

   })

   }



 exports.contact = (req, res)=>{
    
    res.render("contact")
 }

