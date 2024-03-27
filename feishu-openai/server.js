const http = require('http');
const handleRequest = require('./src/index');


const express = require('express');  
const cors = require('cors');  
const bodyParser = require('body-parser');

const app = express(); 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());

const HOST = process.env.HOST || '127.0.0.1';  
const PORT = process.env.PORT || 3000;
const LOG_LEVEL = process.env.LOG_LEVEL || ''//DEBUG


// 定义路由处理函数  
app.post('/', (req, res) => {
  const params = req.body; 
  // console.log('params',params)
  // 或者，如果参数在请求体中，你可能需要解析请求体，例如使用 body-parser 中间件  
  // 构建上下文对象（根据实际需求）  
  const context = {  
    trigger: LOG_LEVEL
    // 这里可以添加任何你需要的上下文信息 
    // 例如，可以从请求头、会话、数据库等获取  
  };  
  // 调用处理请求的方法  
  const responseData = handleRequest(params, context);  
  responseData.then(response=>
    res.send(response)// 发送响应
  )
});  

// app.get('/', (req, res) => {  
//   // 从请求中获取参数  
//   const params = req.query; // 如果参数在查询字符串中
//   console.log('params',params)  
//   // 或者，如果参数在请求体中，你可能需要解析请求体，例如使用 body-parser 中间件  
//   // 构建上下文对象（根据实际需求）  
//   const context = {  
//     trigger: LOG_LEVEL
//     // 这里可以添加任何你需要的上下文信息 
//     // 例如，可以从请求头、会话、数据库等获取  
//   };  
  
//   // 调用处理请求的方法  
//   const responseData = handleRequest(params, context);  
//   // 发送响应  
//   res.send(responseData);  
// });  
  
// 启动服务器  
app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}`);  
});


  
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });  
//         res.end('fdf'); // 发送响应给客户端  
//       } else {  
//         res.writeHead(404);  
//         res.end();  
//       } 
// });  
  
// server.listen(port, host, () => {  
//   console.log(`Server running at http://${host}:${port}/`);  
// });
