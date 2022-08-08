
const path = require('path')

const mysql = require("mysql")

const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
 

})

exports.dash = (req, res)=>{
    pool.getConnection((err,connection)=>{
        if (err) throw err;
         var sql = `SELECT * FROM node_apps`

        connection.query(sql,(err,result)=>{
            connection.release()

            if (!err){            
            res.render("backend/dashboard")

            }else {
               throw err
            }

        })
    })
}



exports.backPost = (req, res)=>{
    pool.getConnection((err,connection)=>{
        if (err) throw err;

        // console.log(req.files) 
        
        // const {post_img} = req.files

        // const {title, subtitle, content, username} = req.body

        // const filename = path.resolve(__dirname,`../..public/backend/post_img2`,post_img.name)

        // post_img.mv(filename,(err,connection)=>{
            // var sql = `SELECT * FROM node_apps title=?, subtitle=?, content=?, username=?`
            var sql = `SELECT * FROM node_apps `

            // pool.query(sql,[title, subtitle, content, username],`/post_img2/${post_img.name}`,(err,post)=>{
                connection.query(sql,(err,post)=>{
                connection.release()
    
                if (!err){
                    res.render("backend/backPost",{
                        post:post
                    })
    
                }else{
                    throw err
                }
    
            })
        // })
            
        })

     

    
}