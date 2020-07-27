
const isTeacher = (req, res, next) => {
  if(req.decodedToken.role === 'teacher'){
      next()
      return 
  }

  return res.send({message: "You are not a teacher. You do not have access to this page"}).status(401)
}


module.exports = isTeacher