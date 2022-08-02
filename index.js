

const express = require('express')

const path = require('path')

const {config, engine} = require("express-edge")


const app = express()

const port = 3000

const expressFileUpload = require("express-fileupload")


require ('dotenv').config()
// console.log(process.env);

app.use(express.static("public"))

app.use(engine)

app.set("views",`${__dirname}/views`)

app.use(express.urlencoded({extended : true}))


app.use(expressFileUpload())


// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "project",
// })


const mysql = require("mysql")

const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
    })



app.get("/create_db",(req,res)=>{
    pool.getConnection((err,connection)=>{

        if (err) throw err

        console.log("we are connected");

        var sql = "CREATE DATABASE project"

        pool.query(sql,(err,result)=>{
            if (err) throw err

            res.send(`${result} is created successfully`)
    })
        
    })
})


app.get("/create_table",(req,res)=>{

        pool.connection((err,connection)=>{

        console.log("we are connected!");

        var sql = "CREATE TABLE node_apps"
        sql += "(id INT AUTO_INCREMENT PRIMARY KEY, "
        sql += "title VARCHAR (225), "
        sql += "subtitle VARCHAR (225), "
        sql += "content VARCHAR (200))"

        pool.query(sql,(err,result)=>{ 
            if (err) throw err

            res.send("Table created successfully!")

        })
    })
})
             
               
   app.get("/create_table",(req,res)=>{

        pool.connection((err,connection)=>{

        console.log("we are connected!");

        var sql = "CREATE TABLE node_apps"
        sql += "(id INT AUTO_INCREMENT PRIMARY KEY, "
        sql += "title VARCHAR (225), "
        sql += "subtitle VARCHAR (225), "
        sql += "content VARCHAR (200))"

        pool.query(sql,(err,result)=>{ 
            if (err) throw err

            res.send("Table created successfully!")

        })
    })
})





    const homeRiotes = require("./server/riotes/homePost")
    app.use("/",homeRiotes)
//     app.get("/about", homeRiotes)
//    app.get("/post",homeRiotes)
//    app.get("/contact",homeRiotes)



    const postRiotes = require("./server/riotes/post")
    app.use("/", postRiotes)
    //  app.post("/store/post", postRiotes)

       
      const backend_post = require("./server/backend/back_rioutes/back_postRioutes")
      app.get("/backend/dashboard",backend_post)
      app.get("/backend/backPost",backend_post)



    app.get("/update",(req,res)=>{
        pool.getConnection((err,connection)=>{
            if (err) throw err
            console.log("connected");

            const title2= `learning javascript is awesome `
            const subtitle = `learning laravel is awesome`
            const content = `learning bootstraps is awesome `
            const username = `Riscoh_fundz❤💖😍`
            var sql = `UPDATE node_apps SET title ='${title2}',username ='${username}',subtitle ='${subtitle}', content = '${content}' WHERE id = 19`
            pool.query(sql,(err,result)=>{
                if (err) throw err
                res.send(`updated succesfully ${result}`)
               
            })
        })
    });


    app.get("/read_update",(req,res)=>{
        con.connect((err)=>{
            var sql = `SELECT * FROM node_apps `

            con.query(sql,(err,data)=>{
                if (err) throw err
                res.send(data)
            })
        })
    })

   app.get("/read_one",(req,res)=>{
    con.connect((err)=>{
        var sql = `SELECT * FROM node_apps WHERE title = 'welcome to mysql'`
        con.query(sql,(err,data)=>{
            res.send(data)
        })
    })
   });

   app.get("/delete",(req,res)=>{
    con.connect((err)=>{
        var sql = `DELETE FROM node_apps WHERE id = 4`
        con.query(sql,(err,data)=>{
            res.send(data)
        })
    })
   })




   



app.listen(port, () => {
    console.log(`'Node app listening to port' ${port}`);
})

