const http = require("http");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
const port = 3030;

const createPath = (...args) =>
  path.join(__dirname, args.join(",").replaceAll(",", "/"));

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.promises
      .readFile(createPath("Pages", "index.html"), "utf-8")
      .then((data) => {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(data);
        res.end();
      })
      .catch((err) => {
        res.writeHead(404, { "content-type": "text/plain" });
        res.write(err);
        res.end();
      });
  } else if (req.url === "/" && req.method === "POST") {
    let body = [];
    req.on("data", (chunk) => body.push(chunk));
    req.on("end", () => {
      body = JSON.parse(body[0].toString());
      fs.promises
        .readFile(createPath("DB", "users.json"), "utf-8")
        .then((data) => {
          const users = JSON.parse(data);
          users.push(body);
          return fs.promises.writeFile(
            createPath("DB", "users.json"),
            JSON.stringify(users)
          );
        })
        .catch((err) => {
          res.writeHead(404, { "content-type": "text/plain" });
          res.write(err);
          res.end();
        });
    });
  } else if (req.url === "/users" && req.method === "GET") {
    fs.promises
      .readFile(createPath("DB", "users.json"), "utf-8")
      .then((data) => {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(data);
        res.end();
      })
      .catch((err) => {
        res.writeHead(404, { "content-type": "text/plain" });
        res.write(err);
        res.end();
      });
  } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "GET") {
    let id = req.url.split("/")[2];
    fs.promises
      .readFile(createPath("DB", "users.json"), "utf-8")
      .then((data) => {
        const users = JSON.parse(data);
        const user = users.find((el) => el.id === id);
        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify(user));
        res.end();
      })
      .catch((err) => {
        res.writeHead(404, { "content-type": "text/plain" });
        res.write(err);
        res.end();
      });
  } else if (req.url.includes("?") && req.method === "GET") {
    const searchKey = req.url
      .slice(req.url.indexOf("?") + 1)
      .split("=")[1]
      .toLowerCase();
    const filterBy = req.url.slice(req.url.indexOf("?") + 1).split("=")[0];
    fs.promises
      .readFile(createPath("DB", "users.json"), "utf-8")
      .then((data) => {
        const result = JSON.parse(data);
        let cond = false;
        for (let key in result[0]) {
          if (key.toLowerCase() === filterBy.toLowerCase()) {
            const concreteUser = result.filter(
              (el) => el[key].toLowerCase() === searchKey
            );
            if (concreteUser.length) {
              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(concreteUser));
              res.end();
            } else {
              cond = true;
            }
          }
        }
        if (cond) {
          res.writeHead(404, { "content-type": "text/plain" });
          res.write(`${searchKey} value not found in your base!`);
          res.end();
        }
      })
      .catch((err) => {
        res.writeHead(404, { "content-type": "text/plain" });
        res.write(err);
        res.end();
      });
  } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "PUT") {
    let id = req.url.split("/")[2];
    let body = [];
    req.on("data", (chunk) => body.push(chunk));
    req.on("end", () => {
      body = JSON.parse(body[0]);
      fs.promises
        .readFile(createPath("DB", "users.json"), "utf-8")
        .then((data) => {
          const users = JSON.parse(data);          
          let updatedData = users.map((el) => {
            return el.id === id ? body : el;
          });
          return fs.promises.writeFile(
            createPath("DB", "users.json"),
            JSON.stringify(updatedData)
          );
        })
        .catch((err) => {
          res.writeHead(404, { "content-type": "text/plain" });
          res.write(err);
          res.end();
        });
    });
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.write("NOT FOUND");
    res.end();
  }
});

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server runing in ${port} succesfully!`);
  }
});
