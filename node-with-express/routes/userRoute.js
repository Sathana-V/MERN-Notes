const express = require("express");
const userRoutes = require("../controller/userController");
//mounting routes in express
const userroute = express.Router();
userroute.param("id", userRoutes.checkForId);

//chaning of middle wares

userroute.route("/").get(userRoutes.getUsers).post(userRoutes.validatePayload ,userRoutes.createUser);

userroute
  .route("/:id")
  .get(userRoutes.getUserById)
  .put(userRoutes.editUser)
  .delete(userRoutes.deleteUser);

module.exports = userroute;
