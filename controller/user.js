const User = require("../modals/user");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(email);
    if (password.length < 6) {
        return res.status(400).json({message :'Password must be at least 6 characters long'});
    }
    if (!validator.isEmail(email.trim())) {
        return res.status(400).json({message :'Invalid email format'});
    }
    if (!validator.isAlphanumeric(username.trim())) {
        return res.status(400).json({message :'Username must contain only letters and numbers'});
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({message :'Email is already in use. Please use a different email address.'});
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            id: uuid.v4(),
            username: username.trim(),
            email: email.trim(),
            password: hash,
            role_id: 5,
            created_at: Date.now(),
        });
        const data = await newUser.save();
        const localobj = data.toObject();
        delete localobj.password;
        res.status(201).json({message :"Account created successfully",data :JSON.stringify(localobj)});
    }
    catch (e) {
        console.log('error in signup controller', e);
        res.status(500).json({message :'unexpected error in signup try again later'});
    }
}

const signin = async(req, res) => {
    const { email, password} = req.body;
    if (password.length < 6) {
        return res.status(400).json({message :'Password must be at least 6 characters long'});
    }
    if (!validator.isEmail(email.trim())) {
        return res.status(400).json({message :'Invalid email format'});
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message :'user not found'});
        }
        if(!bcrypt.compareSync(password,user.password)){
            return res.status(401).json({message :'invalid credentials'});
        }
        const main = {
            email : user.email,
            username : user.username,
            last_login : user.last_login
        }
        const localobj = user.toObject();
        delete localobj.password
        delete localobj._id
        delete localobj.id
        const token = jwt.sign(main, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({message :'login sucess',data:{ token , user : localobj}});
    } 
   catch(e){
       console.log('error in signin controller',e);
       res.status(500).send('unexpected error in signup try again later');
   }
}

module.exports = { signup, signin };