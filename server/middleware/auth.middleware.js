const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
require('dotenv').config();

const secreteKey = process.env.SECRETEKEY || "assignment";


const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {

        const decode = jwt.verify(token, secreteKey)
        req.user = await UserModel.findById(decode.id)
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });

        }
       
        req.body.userId = decode.id
        next();
        
    } catch (error) {
        res.status(500).send('user not Authorized login please')
    }
}

module.exports = auth;
