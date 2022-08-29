
module.exports = async (req, res, next)=>{
  if (req.session.userId){
    return await res.redirect("/")

  }
  
    next()
}