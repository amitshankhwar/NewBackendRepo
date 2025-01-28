function auth(req, res, next) {
  console.log("its middleware");
  
  if(0){
    return res.status(200).json({ message: "middleware is working" });
  }


  next();
}

export default auth;
