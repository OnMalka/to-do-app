const express = require('express'); 
const cors = require('cors');

const port = process.env.Port
require('./db/mongoose');
const taskRouter = require('./routers/taskRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(taskRouter);

app.listen(port,()=>{
    console.log('Server conecctes port: ',port);
});