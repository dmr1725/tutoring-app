const isStudent = (req, res, next) => {
    if(req.decodedToken.role === 'student'){
        next()
        return 
    }
  
    return res.send({message: "You are not a student. You do not have access to this page"}).status(401)
  }
  
  
  module.exports = isStudent