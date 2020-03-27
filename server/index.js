const express = require("express");
const app = express();
const cors = require ("cors");
const pool =require("./db");

//midleware
app.use(cors());
app.use(express.json());

//ROUTES//


// create a rose

app.post("/roses", async (req, res)=>{
    try{
        const {description} = req.body;
        const newRose = await pool.query("Insert INTO roses (description) Values($1) RETURNING *",
        [description]
        );
        res.json(newRose.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all roses

app.get("/roses", async(req, res) => {
   try {
       const allRosses = await pool.query("SELECT * FROM roses");
       res.json(allRosses.rows);

   } catch (err) {
       console.error(err.message);
   }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");

});
