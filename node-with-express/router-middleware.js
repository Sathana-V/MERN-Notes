const express = require("express");
const morgan = require('morgan'); // third party middleware
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(morgan('dev'));
const port = 8090;
//middle ware - always a function with req, res and next 
app.use((req, res, next) => {
    console.log(' this is middleware');
    next();
})
app.listen(port, () => {
  console.log("server started");
});
let users = JSON.parse(fs.readFileSync("./data/database.json", "utf-8"));

app
  .route("/")
  .get((req, res) => {
    console.log(" main route get request");
    res.send(" main route get request");
  })
  .post((req, res) => {
    res.send("main route post request");
  });

app.get("/users", (req, res) => {
  // res.status(200).send('hello ');
  res.status(200).json({
    status: "200",
    data: users,
  });
});
app.get("/users/:id/:status?", (req, res) => {
  // res.status(200).send('hello ');
  const user = users.find((e) => e.id == req.params.id);
  console.log("request param", req.params);
  res.status(200).json({
    status: "200",
    data: user,
  });
});

app.post("/users", (req, res) => {
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
});

app.put("/users/:id", (req, res) => {
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
});
app.delete("/users/:id", (req, res) => {
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
});
