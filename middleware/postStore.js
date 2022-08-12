
module.exports = (req, res, next)=>{
    // console.log('i have been called');
    const {title, subtitle, content, username} = req.body
    if (!req.files ||!title ||!subtitle ||!content ||!username){
    return res.redirect("/create/post")
    }
    next()
    
}