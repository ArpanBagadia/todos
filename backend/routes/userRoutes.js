const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken')
require("dotenv").config()

const controller = require("../controllers/signupController")
const controllerLogin = require("../controllers/loginController")
const controllerHome = require("../controllers/homeController")

const middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};

module.exports = middleware;


routes.post("/signup", controller.signup)
routes.post("/verify", controller.verify)
routes.post("/login", controllerLogin.login)
routes.post("/createNote", middleware, controllerHome.createNote)
routes.get("/getNote", middleware, controllerHome.getNotes)
routes.delete("/deleteNote/:id", middleware, controllerHome.deleteNote);
routes.put("/updateNote/:id", middleware, controllerHome.updateNote)

module.exports = routes