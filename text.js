
const express = require('express')

const mysql = require("mysql")

const path = require('path')

const {config, engine} = require('express-edge')

const app = express()

const port = 4000

require ('dotenv').config()
console.log(process.env);

app.use(express.static("public"))

app.use(engine)
 

app.set("views",`${__dirname}/views`)


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fundz"
})

app.get("/create_db",(req,res)=>{
    con.connect((err)=>{

        if (err) throw err

        console.log("we are connected");

        var sql = "CREATE DATABASE fundz"

        con.query(sql,(err,result)=>{
            if (err) throw err

            res.send(`${result} is created successfully`)
    })
        
    })
})


// app.get("/create_table",(req,res)=>{

//         con.connect((err)=>{

//         console.log("we are connected!");

//         var sql = "CREATE TABLE customers"
//         sql += "(id INT AUTO_INCREMENT PRIMARY KEY, "
//         sql += "title VARCHAR (225), "
//         sql += "description VARCHAR (225), "
//         sql += "content VARCHAR (200))"

//         con.query(sql,(err,result)=>{ 
//             if (err) throw err

//             res.send("Table created successfully!")

//         })
//     })
// })

app.get("/create_tables",(req,res)=>{

    con.connect((err)=>{

    console.log("we are connected!");

    var sql = "CREATE TABLE posts"
    sql += "(id INT AUTO_INCREMENT PRIMARY KEY, "
    sql += "title TEXT, "
    sql += "description TEXT, "
    sql += "content TEXT)"

    con.query(sql,(err,result)=>{ 
        if (err) throw err

        res.send("Table created successfully!")

    })
})
})

app.get("/create_post",(req,res)=>{
    con.connect((err)=>{
        if (err) throw err
        console.log("we are connected");
    })
        const title = `welcome to mysql`
        const description = `Node with mysql`
        const content = `Node is awesome`

        var sql = `INSERT INTO customers (title, description, content) VALUES ('${title}', '${description}', '${content}')`

        con.query(sql,(err,result)=>{
            if (err) throw err
            res.send("Data created successfully")
        })
   
})

app.get("/read_all_post",(req,res)=>{
    con.connect((err)=>{
        if (err) throw err
        console.log("connected");
        var sql = "SELECT * FROM customers "
        con.query(sql,(err,result)=>{
            
                if (err) throw err
    
                // res.send (`post created successfully${result}`)
               console.log(result);
        
        
        })
    })
})

       app.get("/create_one_post",(req,res)=>{
        con.connect((err)=>{
            if (err) throw err
       })
     
       console.log("connected!");
      var sql = "SELECT * FROM  customers WHERE id = 1"
      con.query(sql,(err,result)=>{
        if (err) throw err
        res.send(`create post sucessfully ${result}`)
      }) 

    })

    // app.get("/create",(req,res)=>{
    //     con.connect((err)=>{
    //         if (err) throw err
    //         console.log("we are connected");
    //         var title2 = `my second customers`;
    //         var content = `my second content`;
    //         var description = `my second description`;

    //         var sql = `INSERT INTO customers (title, description , content) VALUES' ${title2}', '${description}', '${content}')`
    //         con.query(sql,(err,result)=>{
    //           if (err) throw err
    //           res.send(`data saves successfully ${result}`)

    //     })

      
    //   })
    // })
    
    app.get("/limit",(req,res)=>{
        con.connect((err)=>{
            var sql = `SELECT * FROM customers LIMIT 5`
            con.query(sql,(err,result)=>{
                res.send(result)
            })
        })
    })

    app.get("/update",(req,res)=>{
        con.connect((err)=>{
            if (err) throw err
            console.log("connected");

            const title2= `sport news`
            const description = `Nigerian`
            const content = `latest sport news`

            var sql = `UPDATE customers SET title = '${title2}', description = '${description}', content = '${content}' WHERE id = 2`
            con.query(sql,(err,result)=>{
                if (err) throw err
                res.send(result)
               
            })
        })
    })

    app.get("/delete",(req,res)=>{
        con.connect((err)=>{
            if (err) throw err
            console.log("connected");


            var sql = `DELETE FROM customers   `
            con.query(sql,(err,result)=>{
                if (err) throw err
                res.send("delete created succesfully")
            })
        })
    })





app.listen(port, () => {
    console.log(`'Node app listening to port' ${port}`);
})

