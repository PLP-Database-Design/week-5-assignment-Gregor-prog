const { log } = require("console")
const express = require("express")
const app = express()
const PORT = 5000
const mysql = require("mysql2");
const  dotenv = require("dotenv")

dotenv.config()

app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`);
})

app.get("/",(req,res) => {
    if(err){
        console.log(err);
        res.status(500).send("error creating vibes")
        
    }
    else{
    res.send("haahah, i think i created this server")
    }
})

//connect to db
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

db.connect(
   (err) => {
    if(err){
        console.log('cant connect to db');
        
    }
    else{
        console.log('connection to database is successful');
        
    }
   }
)

app.get("/patients",(req,res) => {
    let query = "SELECT patients_id, first_name, last_name, date_of_birth FROM patients"
    db.query(query, (err,result) => {
        if(err){
            console.log(err);
            
            res.status(404).send("couldn't get data")
        }
        else{
            res.send(result)
        }
    })
})


app.get("/providers", (req,res) => {
    let query = "SELECT first_name, last_name, provider_speciality FROM providers"
    db.query(query,(err,result) => {
        if(err){
            console.log(err);
            res.status(500).send("error getting providers data")
             }
             else{
                res.send(result)
             }
    })
})

app.get("/patients_firstName", (req,res) => {
    let query = "SELECT patients_id, first_name FROM patients"
    db.query(query,(err,result) => {
        if(err){
            console.log(err);
            res.status(200).send("Error getting patients firstName")
            }
            else{
                res.send(result)
            }
    })
})

app.get("/providers_specialty", (req,res) => {
    let query = "SELECT provider_id, provider_speciality FROM providers"
    db.query(query, (err,result) => {
        if(err){
            console.log(err);
            res.status(500).send("Error retrieving patients specialty")
            }
            else{
                res.send(result)
            }
    })
})