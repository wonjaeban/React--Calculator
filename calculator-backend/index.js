const express = require("express"); // 설치한 express module을 불러와서 변수(express)에 담습니다.
const app = express(); //express를 실행하여 app object를 초기화 합니다.

app.use(express.json());

app.post("/post", (req, res) => {
  const mathExpression = req.body.number;
  const value = req.body.result;
  let request = new sql.Request();
  request.stream = true;

  let q = `INSERT INTO calculator (mathExpression, value) VALUES ('${mathExpression}', '${value}')`;

  request.query(q, (err, recordset) => {
    if (err) {
      console.log("query error :", err);
    } else {
      console.log("insert 완료");
    }
  });
});

app.get("/get", (req, res) => {
  let q = "SELECT * FROM calculator";
  let request = new sql.Request();
  request.stream = true;
  request.query(q, (err, rows) => {
    if (err) {
      return console.log(`query error: ${err}`);
    }
  });
  let result = [];
  request
    .on("error", function (err) {
      console.log(err);
    })
    .on("row", (row) => {
      result.push(row);
    })
    .on("done", () => {
      // 마지막에 실행되는 부분
      console.log(result);
      res.send(result);
    });
});

const port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다.
app.listen(port);

// mssql 연동
const sql = require("mssql");
let config = {
  //   server: "WONJAE0709",
  server: "LAPTOP-SP6G768M",
  port: 1433,
  user: "test",
  password: "test",
  database: "testDB",
  trustServerCertificate: true,
};

sql.connect(config, function (err) {
  if (err) {
    return console.error("error : ", err);
  }
  console.log("MSSQL 연결 완료");
});
