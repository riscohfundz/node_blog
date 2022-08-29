
const express = require('express')
const mysql = require("mysql")
const path = require('path')
const {config, engine} = require("express-edge")
const expressFileUpload = require("express-fileupload")
const expressSession = require("express-session")
const mysqlStore = require("express-mysql-session")(expressSession)
const edge = require('edge.js')

require ('dotenv').config()
// console.log(process.env);
const app = express()
const port = 3000
app.use(express.static("public"))

app.use(engine)

app.set("views",`${__dirname}/views`)

app.use(express.urlencoded({extended : true}))

app.use(expressFileUpload())

const options = {
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
    }

    const db_conn = mysql.createPool(options)
 var session_store = new mysqlStore({}, db_conn)


app.use(expressSession({
    secret                :       "secret",
    store                 :       session_store,
    proxy                 :       true,
    resave                :       false,
    saveUninitialized     :       false
}))

app.use("*",(req,res,next)=>{
    app.locals.auth = req.session.userId
    next()
})
// USER CODER
  

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project",
})

const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
     });

    


// app.get("/create_db",(req,res)=>{
//     pool.getConnection((err,connection)=>{

//         if (err) throw err

//         console.log("we are connected");

//         var sql = "CREATE DATABASE project"

//         pool.query(sql,(err,result)=>{
//             if (err) throw err

//             res.send(`${result} is created successfully`)
//     })
        
//     })
// })


// app.get("/create_table",(req,res)=>{

//         pool.getConnection((err,connection)=>{

//         console.log("we are connected!");

//         var sql = "CREATE TABLE node_apps"
//         sql += "(id INT AUTO_INCREMENT PRIMARY KEY, "
//         sql += "title VARCHAR (225), "
//         sql += "subtitle VARCHAR (225), "
//         sql += "content VARCHAR (200))"

//         pool.query(sql,(err,result)=>{ 
//             if (err) throw err

//             res.send("Table created successfully!")

//         })
//     })
// })


// app.get("/create_table",(req,res)=>{

//  pool.getConnection((err,connection)=>{

//    console.log("we are connected!");

//     var sql = `CREATE TABLE node_apps(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR (225) not null, subtitle VARCHAR (225) not null, content TEXT not null, post_img VARCHAR (225), created_at DATETIME DEFAULT CURRENT_TIMESTAMP, user_id int not null, foreign key (user_id) references users(id) on delete cascade on update cascade);`

//         connection.query(sql,(err,result)=>{ 
//             if (err) throw err

//             res.send("Table created successfully!")

//         })
//     })
// })
             
               
//    app.get("/create_table",(req,res)=>{

//         pool.getConnection((err,connection)=>{

//         console.log("we are connected!");

//         var sql = "CREATE TABLE users"
//         sql += "(id INT AUTO_INCREMENT PRIMARY KEY, "
//         sql += "username VARCHAR (225), "
//         sql += "email VARCHAR (225), "
//         sql += "password VARCHAR (255))"

//         connection.query(sql,(err,result)=>{ 
//             if (err) throw err

//             res.send("Table created successfully!")

//         })
//     })
// })





    const homeRiotes = require("./server/riotes/homePost")
    app.use("/",homeRiotes)
//     app.get("/about", homeRiotes)
//    app.get("/post",homeRiotes)
//    app.get("/contact",homeRiotes)



    const postRiotes = require("./server/riotes/post")
    app.use("/", postRiotes)
    //  app.post("/store/post", postRiotes)

       // BACKEND CODING
      const backend_post = require("./server/backend/back_rioutes/back_postRioutes")
      app.get("/backend/dashboard",backend_post)
      app.get("/backend/backPost",backend_post)
       
      // USER CODER
      const register = require("./server/riotes/user")
      const session = require('express-session')
      app.use("/", register)

//     app.get("/update",(req,res)=>{
//         pool.getConnection((err,connection)=>{
//             if (err) throw err
//             console.log("connected");

//             const title2= `learning javascript is awesome `
//             const subtitle = `learning laravel is awesome`
//             const content = `learning bootstraps is awesome `
//             const username = `Riscoh_fundz❤💖😍`
//             var sql = `UPDATE node_apps SET title ='${title2}',username ='${username}',subtitle ='${subtitle}', content = '${content}' WHERE id = 19`
//             pool.query(sql,(err,result)=>{
//                 if (err) throw err
//                 res.send(`updated succesfully ${result}`)
               
//             })
//         })
//     });


//     app.get("/read_update",(req,res)=>{
//         pool.getConnection((err,connection)=>{
//             var sql = `SELECT * FROM node_apps `

//             con.query(sql,(err,data)=>{
//                 if (err) throw err
//                 res.send(data)
//             })
//         })
//     })

//    app.get("/read_one",(req,res)=>{
//     pool.getConnection((err,connection)=>{
//         var sql = `SELECT * FROM node_apps WHERE title = 'welcome to mysql'`
//         con.query(sql,(err,data)=>{
//             res.send(data)
//         })
//     })
//    });

//    app.get("/delete",(req,res)=>{
//     pool.getConnection((err,connection)=>{
//         var sql = `DELETE FROM node_apps`
//         connection.query(sql,(err,data)=>{
//             res.send("post deleted all")
//         })
//     })
//    })

 


   



app.listen(port, () => {
    console.log(`'Node app listening to port' ${port}`);
})

