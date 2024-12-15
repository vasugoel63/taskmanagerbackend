const User = require("../Models/User");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const signup = async(req,res)=>{
  try{
    const  {name, email , password} = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    const user = new User({name, email, password: hashed_password});
    await user.save();
    res.status(200).json({user});
  }
  catch(error){
    console.log(error);
    res.status(400).json({message: "Invalid error"})
  }

}
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      let token;
      if (passwordMatch) {
        token = jwt.sign(
          {
              userid: user.id,
              email: user.email
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
      );
        return res.status(200).json(
          {
            message:"User logged in successfully",
            data: {
              name: user.name,
              email: user.email,
              token: token,
              id: user.id
            }
          }
        );
      } else {
        return res.status(401).json({ message: "Please enter correct password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {login, signup};