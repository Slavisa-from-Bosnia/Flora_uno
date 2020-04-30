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
});

// get a rose
app.get("/roses/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const rose =await pool.query("SELECT *FROM roses WHERE rose_id =$1", [id]);
        res.json(rose.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// update a rose

app.put("/roses/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateRoses = await pool.query("UPDATE roses SET description = $1 WHERE rose_id = $2",
        [description, id]
        );
        res.json("Roses was updated!");

    } catch (err) {
        console.error(err.message);
    }
});

// delete a rose

app.delete("/roses/:id", async (req,res) => {
    try {
        const {id} =req.params;
        const delateRoses = await pool.query("DELETE FROM roses WHERE rose_id = $1", [id]);
        res.json("Rose was deleted!")

    } catch (err) {
        console.error(err.message);
    }
})

// create buyer

app.post("/buyers", async (req, res)=>{
    try{
        const {input} = req.body;
        const newBuyer = await pool.query(
        "INSERT INTO buyers (name, address, city, phone, email) VALUES ($1,$2, $3, $4, $5) RETURNING *",
        [input.firstName, input.address, input.city, input.phone, input.meil]
        );
        res.json(newBuyer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all buyers

app.get("/buyers", async(req, res) => {
    try {
        const allBuyers = await pool.query("SELECT * FROM buyers ORDER BY buyer_id DESC");
        res.json(allBuyers.rows);
 
    } catch (err) {
        console.error(err.message);
    }
 });

//  delete buyer or buyers needed futher works
app.delete("/buyers/:selected", async (req,res) => {

    console.log(req.params.selected);
    try {
        const idsFromSelected = req.params.selected
        const deleteBuyers = await pool.query("DELETE FROM buyers WHERE buyer_id IN ($1)", [idsFromSelected]);
        console.log(`Buyer-s ${idsFromSelected} was/were deleted`);
        res.json(deleteBuyers);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");

});
