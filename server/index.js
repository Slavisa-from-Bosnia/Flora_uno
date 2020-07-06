const express = require("express");
const app = express();
const cors = require ("cors");
const pool =require("./db");

//midleware
app.use(cors());
app.use(express.json());

//ROUTES//

    // create order

    app.post("/orders", async (req, res)=>{
        try{
            const data = req.body;
            console.log(req.body);
            const newRose = await pool.query("Insert INTO orders (buyer_id, payment_method, totalSum ) Values($1, $2, $3) RETURNING *",
            [data.buyer_id, data.payment_method, data.totalSum ]
            );
            console.log(`Dodata sledeća narudžba u bazi; ${newRose.rows[0]}`);
            res.json(newRose);
        } catch (err) {
            console.error(err.message);
        }
    });
    
    // get all orders

    app.get("/orders", async(req, res) => {
        try {
            const allOrders = await pool.query ("SELECT order_id, buyer_id, FROM orders ORDER BY date_of_order DESC");
            res.json(allOrders.rows);
        } catch (err) {
            console.error(err.message);
        }
    });

    // create a rose

    app.post("/roses", async (req, res)=>{
        try{
            const inputRoses = req.body;
            console.log(req.body);
            const newRose = await pool.query("Insert INTO roses (name, initial_quantity, image_url, description, price, input_sum, output_sum, reserved_sum, current_sum) Values($1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING *",
            [inputRoses.name, inputRoses.initial_quantity, inputRoses.image_url, inputRoses.description, inputRoses.price, inputRoses.input_sum, inputRoses.output_sum, inputRoses.reserved_sum, inputRoses.current_sum]
            );
            console.log('Dodata ruža u bazi!')
            res.json(newRose.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });

    // get all roses

    app.get("/roses", async(req, res) => {
        try {
            const allRosses = await pool.query("SELECT * FROM roses ORDER BY rose_id DESC");
            res.json(allRosses.rows);

        } catch (err) {
            console.error(err.message);
        }
    });

    // get a rose
    app.get("/roses/:id", async (req,res) => {
        try {
            const {id} = req.params;
            const rose =await pool.query("SELECT *FROM roses WHERE rose_id =$1 ", [id]);
            res.json(rose.rows[0]);

        } catch (err) {
            console.error(err.message);
        }
    });

    // update a rose

    app.put("/roses/:id", async (req, res) => {
        try {
            const {id} = req.params;
            const data = req.body;
            console.log(data);
            const updateRoses = await pool.query("UPDATE roses SET name = $1, description = $2, initial_quantity = $3, price = $5  WHERE rose_id = $4 ",
            [data.name, data.description, data.initial_quantity,  data.rose_id, data.price]
            );
            console.log("Roses was updated!");
            res.json(updateRoses);

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
        const input = req.body;
        const newBuyer = await pool.query(
        "INSERT INTO buyers (name, address, city, phone, email) VALUES ($1,$2, $3, $4, $5) RETURNING *",
        [input.firstName, input.address, input.city, input.phone, input.meil]
        );
        console.log("Dodat kupac u bazi");
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

    console.log(req.params);
    try {
        const idsFromSelected = req.params.selected
        const deleteBuyers = await pool.query("DELETE FROM buyers WHERE buyer_id IN ($1)", [idsFromSelected]);
        console.log(`Buyer-s ${idsFromSelected} was/were deleted`);
        res.json(deleteBuyers);
    } catch (err) {
        console.error(err.message);
    }
});

// update a buyer

app.put("/buyers/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {input} = req.body;
        console.log(input);
        const updateRoses = await pool.query("UPDATE buyers SET name = $1, address = $2, city = $3, phone = $4, email = $5 WHERE buyer_id = $6",
        [input.firstName, input.address, input.city, input.phone, input.meil, input.buyer_id]
        );
        res.json("Buyer was update");
        console.log("buyer was updated");

    } catch (err) {
        console.error(err.message);
    }
});

app.get("/buyers_for_orders", async(req, res) => {
    try {
        const allBuyers = await pool.query("SELECT buyer_id, name, address FROM buyers ORDER BY name ");
        res.json(allBuyers.rows);
 
    } catch (err) {
        console.error(err.message);
    }
 });


 
app.listen(5000, () => {
    console.log("server has started on port 5000");

});
