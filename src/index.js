const express=require('express');
const app=express();

const bodyParser=require('body-parser');

const {PORT}=require(process.env.PORT);
const apiRoutes=require('./routes/index');
const db=require('./models/index')

const setupAndStartServer=()=>{
    application.listen(PORT,()=>{
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extends:true}));

        app.use('./api',apiRoutes)

        console.log(`Server started at port ${PORT}`)

        if(process.env.DB_SYNC)
        {
            db.sequelize.sync({alter:true});
        }
    });
}

setupAndStartServer();

 