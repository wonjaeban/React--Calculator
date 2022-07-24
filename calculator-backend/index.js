const express = require("express"); // 설치한 express module을 불러와서 변수(express)에 담습니다.
const app = express(); //express를 실행하여 app object를 초기화 합니다.

app.use(express.json());

app.post("/history", (req, res) => {
  const mathExpression = req.body.number;
  const value = req.body.result;
  const success = { result: "DB등록이 완료되었습니다!" };
  const fail = {
    result: "서버에 문제가 발생했습니다! 히스토리가 저장되지 않았습니다!",
  };
  let request = new sql.Request();

  let q = `INSERT INTO calculator1 (mathExpression, value) VALUES ('${mathExpression}', '${value}')`;

  request.query(q, (err, recordset) => {
    if (err) {
      //쿼리에 문제가 있을 시에
      console.log("query error :", err);
      res.status(500);
      res.send(fail);
    } else {
      console.log("insert 완료");
      res.send(success);
    }
  });
});

app.get("/historys", (req, res) => {
  let q = "SELECT * FROM calculator1 ORDER BY T_IDX DESC";
  const fail = { result: "서버에 문제가 발생했습니다!" };
  let request = new sql.Request();
  request.query(q, (err, rows) => {
    if (err) {
      console.log(`query error: ${err}`);
      res.status(500);
      res.send(fail);
      return;
    }
    console.log("get 완료!");
    res.send(rows.recordset);
  });
});

const port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다.
app.listen(port);

// mssql 연동
const sql = require("mssql");
let config = {
  // server: "WONJAE0709",
  server: "LAPTOP-SP6G768M",
  port: 1433,
  user: "test",
  password: "test",
  database: "testDB",
  trustServerCertificate: true,
};

//mssql 연결하는 부분
sql.connect(config, function (err) {
  //연결 오류시
  if (err) {
    return console.error("connection error : ", err);
  }
  console.log("MSSQL 연결 완료");
});
