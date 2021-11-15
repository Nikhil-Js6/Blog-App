const User = require('../models/User');
const bcrypt = require('bcrypt');
const multer = require('multer');

class UserController {

    async update(req, res) {
        if(req.body.userId === req.params.id){
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body
                    },
                    { new: true, }
                );
                res.status(200).json(updatedUser);
            }catch(err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(403).json("You can Update only your Account!");
        }
    }

    async delete(req, res) {
        if(req.body.userId === req.params.id){
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account Deleted Successfully");
            }catch(err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(403).json("You can Delete only your Account!");
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...userData } = user._doc;
            res.status(200).json(userData);
        }catch(err) {
             res.status(500).json(err);
        }
    }
    async upload(req, res) {
        const storage = multer.diskStorage({
             destination: (req, file, cb) => {
                  cb(null, "../images");
             },
             filename: (req, file, cb) => {
                  cb(null, `${new Date().getFullYear()}_${new Date().getMonth()}-${new Date().getDay()}_${new Date().getDay()}-${new Date().getHours()}_${new Date().getMinutes()}-${file.originalname}`);
             }
        });

        const upload = multer({ storage });

        app.post("/upload/", upload.single("file"), (req, res) => {
            try {
                return res.status(200).json({ message: "File uploaded Successfully" });
            }catch(err) {
                 res.status(500).json(err);
            }
        });
    }
}

module.exports = new UserController();
