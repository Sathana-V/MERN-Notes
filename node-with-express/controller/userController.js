const fs = require("fs");
let users = JSON.parse(fs.readFileSync("./data/database.json", "utf-8"));
exports.checkForId = (req, res, next, value) => {
  const user = users.find((e) => e.id == req.params.id);
  if (!user) {
    return res.status(200).json({
      status: "404",
      data: {
        message: "User not found with id : " + req.params.id,
      },
    });
  }
  next();
};
exports.getUsers = (req, res) => {
  res.status(200).json({
    status: "200",
    data: users,
  });
};
exports.validatePayload = (req, res, next) => {
    if(!req.body || !req.body.name || !req.body.email) {
       return res.status(200).json({
            status: "500",
            data: {
                message: 'Invalid payload'
            },
          });
    }
    next();
}
exports.createUser = (req, res) => {
  console.log("request param", req.body);
  const newuser = Object.assign({ id: users.length }, req.body);
  console.log(newuser);
  users.push(newuser);
  console.log(users);
  fs.writeFile("./data/database.json", JSON.stringify(users), (error) => {
    console.log("data wrotter", error);
    if (!error) {
      res.status(200).json({
        status: "200",
        data: {
          msg: "user created succuessfuly",
        },
      });
    } else {
      res.status(500).json({
        status: "501",
        data: {
          msg: "Error while creating",
          detail: error.message,
        },
      });
    }
  });
};
exports.getUserById = (req, res) => {
  // res.status(200).send('hello ');
  const user = users.find((e) => e.id == req.params.id);
  console.log("request param", req.params);
  res.status(200).json({
    status: "200",
    data: user,
  });
};
exports.editUser = (req, res) => {
  console.log(req.body);
  const userIndex = users.findIndex((e) => e.id == req.params.id);
  const user = users.find((e) => e.id == req.params.id);
  const editedUser = Object.assign(user, req.body);
  console.log(editedUser);
  console.log(req.params.id);

  users[userIndex] = editedUser;

  fs.writeFile("./data/database.json", JSON.stringify(users), (error) => {
    console.log("data wrotter", error);
    if (!error) {
      res.status(200).json({
        status: "200",
        data: {
          msg: "user created succuessfuly",
        },
      });
    } else {
      res.status(500).json({
        status: "501",
        data: {
          msg: "Error while creating",
          detail: error.message,
        },
      });
    }
  });
};
exports.deleteUser = (req, res) => {
  users = users.filter((e) => e.id != req.params.id);
  fs.writeFile("./data/database.json", JSON.stringify(users), (error) => {
    console.log("data wrotter", error);
    if (!error) {
      res.status(200).json({
        status: "200",
        data: {
          msg: "user deleted succuessfuly",
        },
      });
    } else {
      res.status(500).json({
        status: "501",
        data: {
          msg: "Error while deleteing",
          detail: error.message,
        },
      });
    }
  });
};
