
module.exports = (req, res, next)=>{
    // console.log('i have been called');
    const {title, subtitle, content,} = req.body
    if (!req.files ||!title ||!subtitle ||!content){
    return res.redirect("/create/post")
 }

    next()
    
}