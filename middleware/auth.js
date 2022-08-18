
const mysql = require("mysql")

const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
})
module.exports= (req, res, next)=>{
    pool.getConnection((err,connection)=>{
        // console.log(req.session);
        if(err) throw err
        var sql = `SELECT * FROM users WHERE id=?`
        connection.query(sql,[req.session.userId],(err,user)=>{
            if (err || !user[0]){
                return res.redirect("/auth/login")
            }
            next()
        })
    })
}