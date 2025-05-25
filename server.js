import http from 'http';
import fs from 'fs/promises';
import  url from 'url';
import path from 'path';
const PORT= process.env.PORT;

// Get current path
const __filename= url.fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
console.log(__dirname, __filename);
const server= http.createServer(async(req,res)=>{
    // res.setHeader('Content-Type','text/html');
    // res.end('<h1>Hello World ! </h1><p>my text paragraph </p>')
  
  try
  {
// check if GET request
if(req.method=='GET')
{
    let filePath;
 if (req.url==='/')
   {
    filePath= path.join(__dirname,'public','index.html');
    // res.writeHead(200,{'Content-Type':'text/html'})
    // res.end('<h1> HomePage </h1>');
   }
   else if(req.url=='/about')
   {
    filePath= path.join(__dirname,'public','about.html');
    //   res.writeHead(200,{'Content-Type':'text/html'})
    //   res.end('<h1> About page </h1>');
   }
   else
   {
    throw new Error('Not found')
    //   res.writeHead(200,{'Content-Type':'text/html'})
    //   res.end('<h1> Not Found </h1>');
   }
   const data= await fs.readFile(filePath);
   res.setHeader('Content-Type','text/html');
   res.write(data);
   res.end();
}
else
{
throw new Error('Method not allowed');
}
  }
  catch(error)
  {
res.writeHead(500,{'Content-Type':'text/plain'})
      res.end('Server Error');
  }
   
    console.log(req.url)
    console.log(req.method)
   
});

server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
