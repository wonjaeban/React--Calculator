
const express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
const app = express(); //express를 실행하여 app object를 초기화 합니다.

app.use(express.json())

app.post('/post', (req, res) => { // '/' 위치에 'get'요청을 받는 경우,
    const mathExpression = req.body.number;
    const value = req.body.result;
    let request = new sql.Request();
    request.stream = true;
    
    let q = `INSERT INTO calculator (mathExpression, value) VALUES ('${mathExpression}', '${value}')`;
    
    request.query(q, (err, recordset) => {
        if(err){
            console.log('query error :', err)
        }
        else{
            console.log('insert 완료')
        }
    })
});

app.get('/get', (req, res) => {
    let q = "SELECT * FROM calculator";
    let request = new sql.Request();
    request.stream = true;
    request.query(q, function(err, rows) {
        console.log(rows);

        }
        
        
        
    )
});

const port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다. 
app.listen(port);

// mssql 연동
const sql = require('mssql');
let config = {
    server: 'WONJAE0709',
    port: 1433,
    user: 'test',
    password: 'test',
    database: 'testDB',
    trustServerCertificate: true
}

sql.connect(config, function(err){
    if(err){
        return console.error('error : ', err);
    }
    console.log('MSSQL 연결 완료');
})

sql.on('error', err => {
    // ... error handler 
    console.log("Sql database connection error " ,err);
})
