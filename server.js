const dotenv = require('dotenv')
const app = require("./app");
dotenv.config({ path: './config/.env' });
const databaseConnection = require("./config/databaseConnection");


databaseConnection();
app.listen(process.env.PORT,()=>{
    console.log("server is running on port", process.env.PORT);
})
