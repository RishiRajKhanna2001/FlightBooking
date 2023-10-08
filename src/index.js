const express=require('express');
const bodyParser=require('body-parser');
const app=express();

const {PORT,FLIGHT_SERVICE_PATH}=require('./config/server-config');
const apiRoutes=require('./routes/index');
const db=require('./models/index')

const setupAndStartServer=()=>{
    app.listen(PORT,()=>{
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));

        app.use('./api',apiRoutes)

        console.log(`Server started at port ${PORT}`)
        if(process.env.DB_SYNC)
        {
            db.sequelize.sync({alter:true});
        }
    });
}

setupAndStartServer();
