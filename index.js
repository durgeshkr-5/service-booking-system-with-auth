const express = require('express');
require('dotenv').config()
const connectMongoDB = require('./config/connectMongoDb');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');
const authMiddleware = require('./middlewares/auth.middlewares');
const authorizeRoles = require('./middlewares/authorizeRole');


const app = express();
const port = process.env.PORT || 8000;

//connect mongodb
connectMongoDB();


//middleware
app.use(express.json());


//routes
app.use("/auth",authRouter);
app.use("/users",authMiddleware,authorizeRoles("user"),userRouter);
app.use("/admin",authMiddleware,authorizeRoles("admin"),adminRouter);

//unhandle routes
app.use((req,res) => {
    return res.status(404).json({msg:"404 Not Found!!!"})
})


//server
app.listen(port,() => {
    console.log(`Server is runnig at port : ${port}`);
})