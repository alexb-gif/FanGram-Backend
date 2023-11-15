const jwt = require('jsonwebtoken');
const UserModel = require("../models/userModel")

exports.isAuthenticatedUser = async (req, res, next) => {
    try {

        const headerToken = req.headers.authorization?.split(' ')[1];
       
       

        if (headerToken) {
            try {
                const verify = jwt.verify(headerToken, process.env.JWT_SECRET);
             
               

                if (verify) {
                    req.user = await UserModel.findById(verify);
                  
                   
 
                    next()
                } else {
                    res.status(403).send({ status: "false", message: "Please login first" })
                }
            }
            catch (e) {
                res.status(403).send({ status: "false", message: "Invalid token id" })

            }
        }
    } catch (error) {
        console.error('err', error);
        res.status(401).send({ message: "Unauthorized" })
    }
}


exports.authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
     
              
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }

  next();
};
