 
setTimeout(() => console.log('🐎 finishes!',1000))

 console.log('🏃🏻‍♀️ finishes!');


// 


const express = require("express")

const mysql = require("mysql")

const app = express()

const port = 4000

app.use(express.static("public"))

const {config,engine} = require("express-edge")

app.use(engine)

app.set("views", `${__dirname}/views`)

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"iphone_xsmax"
})

app.get("/create_db",(req,res)=>{
    conn.connect((err)=>{
        if (err) throw err

        console.log("we are connected!");

        var sql = "CREATE DATABASE iphone_xsmax"

        conn.query(sql,(err,data)=>{

          if (err) throw err
        res.send(`${data} database is created!`);
    })
  
    })
})

app.get("/create_table",(req,res)=>{
conn.connect((err)=>{
    if (err) throw err
    console.log("we are connected!!");

   var sql = "CREATE TABLE apple_stores"

   sql += "(username VARCHAR (225), "
   sql += "lastname VARCHAR (225), "
   sql += "id INT AUTO_INCREMENT PRIMARY KEY, "
   sql += "password VARCHAR (225)) "
   conn.query(sql,(err,result)=>{
    if (err) throw err
    res.send(`${result} Table is created!!`)
   })


})

})


app.listen(port,()=>{

})