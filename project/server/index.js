const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())
//bodyParser.json是用来解析json数据格式的。bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据
const cors = require('cors')
app.use(cors())
const mysql = require('mysql2');
const db = mysql.createPool({//创建与数据库db的连接
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'kw31',//是数据库名,而非链接名
  connectionLimit: 50,
});

app.get('/get-flink', (req, res) => {
  console.log(req.query)
  let page = Number(req.query.curr) - 1   // 第几页
  let count = Number(req.query.limit)     // 每页多少条

  db.query('SELECT * FROM flink_table', (err, results) => {
    if (err) throw err;
    let total = results.length;
    db.query(`SELECT sitename,siteurl FROM flink_table limit ${page * count},${count}`, (err, result) => {
      if (err) throw err;
      let responseData = {
          code: 0,
          count: total,
          listData: result
      }
      // setTimeout(() => {=>搭配loading效果
          res.send(responseData)
          // console.log(responseData);
      // }, 500);
  });
    // res.json(result)
  })
})
// 删除友情链接接口
app.post('/del', (req, res) => {
  let { id } = req.body;
  db.query('DELETE FROM flink_table WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json({ code: 0, msg: 'delete success' })
  })
})
// 添加友情链接接口
app.post('/add-flink', (req, res) => {
  console.log(req.body);
  let { sitename, siteurl } = req.body
  db.query('INSERT INTO flink_table(sitename,siteurl) VALUES(?,?)', [sitename, siteurl], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json({ code: 0, msg: 'success' })
  })

})
//更新  
app.post('/updata-flink', (req, res) => {
  console.log(req.body)
  let { sitename, siteurl,id } = req.body//避免输入时注入代码
  db.query('UPDATE flink_table SET sitename = ?, siteurl = ? WHERE id = ?', [sitename, siteurl,id], (err, result) => {
    if (err) throw err;
    
    res.json({ code: 0, msg: 'updata success' })
  })
})
app.listen(port, () => console.log(`服务器启动啦`))
module.exports = db
