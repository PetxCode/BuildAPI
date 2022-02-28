const userModel = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const multer = require("multer");
const router = express.Router();
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dry8nywub",
  api_key: "629241972579982",
  api_secret: "Pc2-culzxkssn7oX8SIZoMLR6vc"
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage }).single("avatar");

router.get("/voters", async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res
      .status(200)
      .json({ message: "found voters successfully...!", data: getUsers });
  } catch (err) {
    res.status(400).json({ message: "Error found...!", data: err.message });
  }
});

router.get("/voter/:id", async (req, res) => {
  try {
    const getUsers = await userModel.findById(req.params.id);
    res
      .status(200)
      .json({ message: "found voters successfully...!", data: getUsers });
  } catch (err) {
    res.status(400).json({ message: "Error found...!", data: err.message });
  }
});

router.patch("/voter/:id", upload, async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    const getUsers = await userModel.findById(
      req.params.id,
      {
        name: req.body.name,
        avatar: image.secure_url
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "found voters successfully...!", data: getUsers });
  } catch (err) {
    res.status(400).json({ message: "Error found...!", data: err.message });
  }
});

router.post("/voter/register", upload, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const image = await cloudinary.uploader.upload(req.file.path);

    const createVoters = await userModel.create({
      name,
      email,
      password: hash,
      avatar: image.secure_url
    });
    res
      .status(200)
      .json({ message: "created successfully", data: createVoters });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.post("/voter/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      const checkPassword = await bcrypt.compare(password, findUser.password);

      if (checkPassword) {
        const token = jwt.sign(
          {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            isAdmin: findUser.isAdmin
          },
          "THISIStheBstVOTEaPP",
          { expiresIn: "3d" }
        );
        const { password, ...info } = findUser._doc;
        res.status(200).json({
          message: "found voters successfully...!",
          data: { ...info, token }
        });
      }
    } else {
      res.status(400).json({ message: "User Not found...!" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error found...!", data: err.message });
  }
});

module.exports = router;
