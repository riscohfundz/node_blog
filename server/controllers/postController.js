
const mysql = require("mysql")

const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
    })

exports.create = (req,res)=>{
    res.render("create_post")
}


exports.store = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if (err) throw err

        console.log("connected");
        console.log(req.body);
        var title = (req.body.title);
        var description = (req.body.description)
        var content = (req.body.content)
        console.log(title);

        console.log(description);

        console.log(content);

        var sql = `INSERT INTO node_apps (title, description, content) VALUES ('${title}', '${description}', '${content}')`
        pool.query(sql,(err,data)=>{
            if (err) throw err
            console.log();("data created successfully")
        })
    })
    res.redirect("/")
}