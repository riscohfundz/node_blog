

const mysql = require("mysql")
const bcrypt = require("bcrypt")


const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
    })

exports.register = (req,res)=>{
    res.render("user_register")
}

exports.stores = (req,res)=>{
   pool.getConnection((err,connection)=>{
    if (err) throw err

     const {username,email,password}= req.body;
     const saltRounds = 10;
     const salt = bcrypt.genSaltSync(saltRounds);
     const hash = bcrypt.hashSync(password,salt);
     var sql = `INSERT INTO users SET username=?,email=?,password=?`;

     connection.query(sql,[username,email,hash],(err,result)=>{
        connection.release()
        if (!err){
            res.redirect("/")
        }else{
            if (err) throw err
        }
     })
   })
}


exports.loginForm = (req,res)=>{
    res.render("login")
}

exports.login = (req, res)=>{
    pool.getConnection((err,connection)=>{
        if (err) throw err
        const {email,password} = req.body;
        var sql = "SELECT * FROM users WHERE email=?"
        connection.query(sql,[email], async (err,user)=>{
            if (err){
                throw err

            }else{
                if (user.length > 0) {
                    const comparision = await bcrypt.compare(password,user[0].password)
                    // console.log(user);
                    if (comparision) {
                     req.session.userId = user[0].id
                     return res.redirect("/")
                    }else{
                        return res.redirect("/auth/login")
                    }
                }else{
                 res.redirect("/about")
                    
                }
            }

        })
    })
}