const http = require('http');
const PORT= process.env.PORT;
const Users= [{id:1,name:'Saurav'},{id:2, name:'Satyam'},{id:3, name:'Rakesh'}]

// Logger middleware
const logger=(req, res, next)=>
{
    console.log(`${req.method} ${req.url}`)
    next();
};

// JSON middleware
const jsonMiddleware= (req, res, next)=>
{
    res.setHeader('Content-Type','application/json');
    next();
}

// Route handler for GET /api/users
const getUsersHandler= (req,res)=>
{
    res.write(JSON.stringify(Users));
    res.end();
}

// Route handler for GET /api/users/:id
const getUserByIdHandler= (req, res) =>
{
 const id= req.url.split('/')[3]
 const user= Users.find((user) => user.id === parseInt(id))
  if (user)
  {
    res.write(JSON.stringify(user));
    res.end();
  }
  else
  {
   
     res.statusCode= 404;
     res.write(JSON.stringify({message:'user not found'}));
     res.end();
  }
}

// Route handler for POST /api/users
const createUserHandler = (req, res) => {
    let body='';
    // listen for data
    req.on('data',(chunk)=>
    {
        body+= chunk.toString();
    });
    req.on('end', ()=> {
        const newUser = JSON.parse(body);
        Users.push(newUser);
        res.statusCode= 201;
        res.write(JSON.stringify(newUser));
        res.end();
    })
}

// Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({message: 'route not found'})); // Changed message to be more accurate
    res.end();
}
const server= http.createServer((req,res)=>{
logger(req, res,() =>{
jsonMiddleware(req, res, ()=>{

    if (req.url==='/api/users' && req.method==='GET')
{
   getUsersHandler(req, res);
}
else if(req.url.match(/\/api\/users\/([0-9]+)/)&& req.method==='GET')
{
  getUserByIdHandler(req, res);
 
}
else if (req.url === '/api/users' && req.method ==='POST')
{
createUserHandler(req,res);
}
else
{
    notFoundHandler(req, res);
}
})

});

})


server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})