

const express = require('express')

const path = require('path')

const {config, engine} = require('express-edge')

const app = express()

const port = 3000

require ('dotenv').config()
// console.log(process.env);

app.use(express.static("public"))

app.use(engine)

app.set("views",`${__dirname}/views`)

app.use(express.urlencoded({extended : true}))





// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "project",
// })



app.get("/create_db",(req,res)=>{
    con.connect((err)=>{

        if (err) throw err

        console.log("we are connected");

        var sql = "CREATE DATABASE project"

        con.query(sql,(err,result)=>{
            if (err) throw err

            res.send(`${result} is created successfully`)
    })
        
    })
})


app.get("/create_table",(req,res)=>{

        con.connect((err)=>{

        console.log("we are connected!");

        var sql = "CREATE TABLE node_apps"
        sql += "(id INT AUTO_INCREMENT PRIMARY KEY, "
        sql += "title VARCHAR (225), "
        sql += "description VARCHAR (225), "
        sql += "content VARCHAR (200))"

        con.query(sql,(err,result)=>{ 
            if (err) throw err

            res.send("Table created successfully!")

        })
    })
})

    const homeRiotes = require("./server/riotes/homePost")
    app.get("/",homeRiotes)
    app.get("/about", homeRiotes)
   app.get("/post",homeRiotes)
   app.get("/contact",homeRiotes)



    const postRiotes = require("./server/riotes/post")
    app.get("/create/post", postRiotes)
     app.post("/store/post", postRiotes)

       
    
    app.get("/update",(req,res)=>{
        con.connect((err)=>{
            if (err) throw err
            console.log("connected");

            const title2= `learning html is awesome `
            const description = `learning css is awesome`
            const content = `learning bootstraps is awesome `

            var sql = `UPDATE node_apps SET title = '${title2}', description = '${description}', content = '${content}' WHERE id = 1`
            con.query(sql,(err,result)=>{
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

