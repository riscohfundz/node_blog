

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
      return res.render("create_post")
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

        const {title, subtitle, content} = req.body
        
        const filename = path.resolve(__dirname,"../../public/post_image/",post_img.name)

         post_img.mv(filename,(err,connection)=>{
            
            var sql = `INSERT INTO node_apps SET title=?, subtitle=?, content=?, post_img=?,  user_id=?`

            pool.query(sql,[title, subtitle, content,`/post_image/${post_img.name}`, req.session. userId],(err,data)=>{
                if (err) throw err
                return  res.redirect("/")
    
            })
       
    
        })

        })
      
}

        exports.edit = (req, res)=>{
          
        pool.getConnection((err,connection)=>{
        if (err) throw err
        const para = req.params.id
        var sql = ` SELECT * FROM node_apps WHERE id=?`
        
        connection.query(sql,[para],(err,post)=>{
       connection.release()
        if (!err){
        res.render("edit_post",{
        post: post[0]
        })

        }else{
           throw err
      }


    })

      })
  }

        exports.update = (req, res)=>{

        pool.getConnection((err,connection)=>{
        if (err) throw err
        
        const {post_img} = req.files 
        const para = req.params.id  
        const filename = path.resolve(__dirname,"../../public/post_image/",post_img.name)
        const {title, subtitle, content,} = req.body
        post_img.mv(filename,(err)=>{
          
          var sql = `UPDATE node_apps SET title=?, subtitle=?, content=?, post_img=? WHERE id=?`
          pool.connection(sql,[title, subtitle, content,`/post_image/${post_img.name}`,para],(err,result)=>{
  
          if (err) throw err
          res.redirect("/")

          })
  
  
            })


        }) 

    
        }