

const path = require('path')
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

        // console.log("connected");
        // console.log(req.body);
        // var title = (req.body.title);
        // var description = (req.body.description)
        // var content = (req.body.content)
        // console.log(title);

        // console.log(description);

        // console.log(content);

        // console.log(req.files);
        const {post_img} = req.files

        const {title, subtitle, content,username} = req.body
        
        const filename = path.resolve(__dirname,"../../public/post_image/",post_img.name)

         post_img.mv(filename,(err,connection)=>{
            var sql = `INSERT INTO node_apps SET title=?, subtitle=?, content=?, username=?, post_img=?`

            pool.query(sql,[title, subtitle, content, username,`/post_image/${post_img.name}`],(err,data)=>{
                if (err) throw err
                    res.redirect("/")
    
                //  res.send("data inserted successfully")
            })
       
    
        })

        })



       
}