const express = require("express");
const app = express();
const cors = require ("cors");
const pool =require("./db");
const format = require('pg-format');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkValid = require("./middleware/check-auth");
// const { default: authContext } = require("../client/src/context/auth-context");

//midleware
app.use(cors());
app.use(express.json());

//ROUTES//

    // create order

    app.post("/orders", checkValid, async (req, res)=>{
       
        try{
            const data = req.body;
            console.log("req.body 21 " + ""+req.body);
           
            const newOrder = await pool.query("Insert INTO orders (buyer_id, payment_method, totalSum ) Values($1, $2, $3) RETURNING *",
            [data.data.buyer_id, data.data.payment_method, data.data.totalSum ]
            );
            var newOrderId= newOrder.rows[0].order_id
            console.log(`Dodata sledeća narudžba u bazi; ${newOrder.rows[0].order_id}`);
            res.json(newOrder.rows[0]);
            var turnoverData = [];
            var i = 0;
            for (i=0; i<data.specification.length; i++){
                var turnoverDataRow = [20, newOrderId, "", "",""];

                turnoverDataRow[2]=data.specification[i].rose_id;
                turnoverDataRow[3]=data.specification[i].quantity;
                turnoverDataRow[4]=data.specification[i].price;
                // turnoverDataRow[5]=data.specificiation[i].sum;

                turnoverData.push(turnoverDataRow);
            }
            console.log("turnoverdata 37" +turnoverData);
            var query1 = format('INSERT INTO turnover (descriptions, descriptions_id, roses_id, reserved, first_price) VALUES %L returning *', turnoverData );
            const newTurnover = await pool.query(query1);
            console.log("newTurnover.rows 40"+newTurnover.rows);
        } catch (err) {
            console.error(err.message);
        }
    });




    app.get("/orders_jb", checkValid, async(req, res) => {
        try {
            const allOrders = await pool.query ("SELECT * FROM orders INNER JOIN buyers ON (orders.buyer_id = buyers.buyer_id) ORDER BY orders.order_id DESC");
            res.json(allOrders.rows);
        } catch (err) {
            console.error(err.message);
        }
    });

    // get spacification
    app.get("/specification/:id", async (req,res) => {
        try {
            const id = parseInt(req.params.id);
            console.log("id 68"+""+id);
            const rose =await pool.query("SELECT *FROM turnover INNER JOIN roses ON (turnover.roses_id = roses.rose_id) WHERE turnover.descriptions_id =$1  ORDER BY turnover.dateOfTurnover DESC", [id]);
            res.json(rose.rows);
            console.log("rose.rows 71"+rose.rows);

        } catch (err) {
            console.error(err.message);
        }
    });

    //  delete order 
    app.delete("/orders/:order_id", checkValid, async (req,res) => {

        console.log("linija 81"+ "" +req.params.order_id);
        try {
            const {order_id} = req.params;
            const deleteTurnovers = await pool.query("DELETE FROM turnover WHERE descriptions IN ($1) and descriptions_id IN ($2)", [20 ,order_id]);
            console.log("obrisan turnover");
            const deleteOrder = await pool.query("DELETE FROM orders WHERE order_id IN ($1) ", [order_id]);
            console.log("obrisan order");
            console.log(`Order ${order_id} was/were deleted`);
            res.json("podaci obrisani");
        } catch (err) {
            console.error(err.message);
        }
    });

    //  update order
    app.put("/orders/shipped/:id", checkValid, async (req, res) => {
        try {
            const {id} = req.params;
            const shipped = req.body.nShipped;
            console.log(req.body);
            console.log("poslati podaci 101" + " " +id+ shipped);
            if(shipped == true){
                const updateOrder = await pool.query("UPDATE orders SET shipped = $1, shipping_date = CURRENT_TIMESTAMP(2)  WHERE order_id = $2 returning * ",
                [shipped, id]
                );
                const updateTurnover = await pool.query("UPDATE turnover SET quantity = -reserved, reserved = 0 WHERE descriptions =$1 AND descriptions_id = $2 returning * ",
                [20, id]
                );

                console.log("Order was updated true!");
                // console.log(updateOrder);
                res.json(updateOrder.rows[0]);
            } else if(shipped == false) {
                const updateOrder = await pool.query("UPDATE orders SET shipped = $1, shipping_date = null  WHERE order_id = $2 returning * ",
                [shipped, id]
                );
                const updateTurnover = await pool.query("UPDATE turnover SET quantity = 0, reserved = -quantity WHERE descriptions =$1 AND descriptions_id = $2 returning * ",
                [20, id]
                );

                console.log("Order was updated false !");
                // console.log(updateOrder);
                res.json(updateOrder.rows[0]);
            }
        } catch (err) {
            console.error(err.message);
        }
    });

    app.put("/orders/payed/:id", checkValid, async (req, res) => {
        try {
            const {id} = req.params;6

            const payed = req.body.nPayed;
            console.log(req.body);
            console.log("poslati podaci 118" + " " +id+ payed);
            const updateOrder = await pool.query("UPDATE orders SET payed = $1  WHERE order_id = $2 returning * ",
            [payed, id]
            );
            console.log("Order was updated!");
            // console.log(updateOrder);
            res.json(updateOrder.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });

    // create a rose

    app.post("/roses", checkValid, async (req, res)=>{
        const inputRoses = req.body;
        console.log(inputRoses);
        try{ 
            const isUserExist =await pool.query(
                "SELECT * FROM roses WHERE name ILIKE $1 ", [inputRoses.name]
            );
            console.log (isUserExist);
            if (isUserExist.rows[0]){
                console.log("Roses exist");
                return res.status(200).json({
                    message:"Roses exist",
                    isExist: true
                    
            });
        } else {
            const newRose = await pool.query("Insert INTO roses (name, image_url, description, price) Values($1, $2, $3, $4) RETURNING *",
            [inputRoses.name, inputRoses.image_url, inputRoses.description, inputRoses.price]
            );
            console.log(newRose);
            const rose_id= parseInt(newRose.rows[0].rose_id);
            const initialTurnover = await pool.query("INSERT INTO turnover (descriptions, roses_id, quantity, first_price) VALUES ($1, $2, $3, $4) RETURNING *",
            [10, rose_id, inputRoses.initial_quantity, inputRoses.price]);
            
            res.status(200).json({
                newRose: newRose.rows[0],
                message: "Roses added",
                isExist: false
            });
            console.log('Dodata ruža u bazi!');
        }
            
        } catch (err) {
            console.error(err.message);
        }
    });

    // get all roses

    app.get("/roses", async(req, res) => {
        try {
            const allRoses = await pool.query("SELECT name, price, image_url, rose_id, description FROM roses  ORDER BY rose_id DESC");
            var i =0;
            var rowRose = {};
            var dataForSend = [];
            for(var i =0; i<allRoses.rows.length; i++){
                const sumFromTurnover1 = await pool.query ("SELECT SUM(quantity) FROM turnover WHERE turnover.roses_id=$1 ",[allRoses.rows[i].rose_id] );
                const sumFromTurnover2 = await pool.query ("SELECT SUM(reserved) FROM turnover WHERE turnover.roses_id=$1 ",[allRoses.rows[i].rose_id] );

                rowRose= {
                    name: allRoses.rows[i].name,
                    price: allRoses.rows[i].price,
                    image_url: allRoses.rows[i].image_url,
                    sum: parseInt( sumFromTurnover1.rows[0].sum),
                    reserved: parseInt( sumFromTurnover2.rows[0].sum),
                    rose_id: allRoses.rows[i].rose_id,
                    description: allRoses.rows[i].description 
                }
                // console.log(rowRose);
                dataForSend.push(rowRose);
            }
            res.json(dataForSend);

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

    app.put("/roses/:id", checkValid, async (req, res) => {
        try {
            const inputRoses = req.body;
            console.log(inputRoses);
            console.log("inputRoses je "+inputRoses.name);

            const id = req.params.id;
            console.log("id je " +id);
            const data = req.body;

            const isUserExist =await pool.query(
                "SELECT * FROM roses WHERE name ILIKE $1 AND rose_id != $2 ", [inputRoses.name, inputRoses.rose_id]
            );
            if (isUserExist.rows[0]){
                console.log("Roses exist");
                return res.status(200).json({
                    message:"Roses exist",
                    isExist: true
                    
                });
            } else {
                
                const updateRoses = await pool.query("UPDATE roses SET name = $1, description = $2, price = $4  WHERE rose_id = $3 ",
                [data.name, data.description, data.rose_id, data.price]
                );
                var correction= parseInt(data.correction);
                const correctionTurnover = await pool.query("INSERT INTO turnover (descriptions, roses_id, quantity) VALUES ($1, $2, $3) RETURNING *",
                [30, data.rose_id, data.correction ]);
                
                res.status(200).json({
                    newRose: updateRoses.rows[0],
                    message: "Roses was updated",
                    isExist: false
                });
                console.log('Roses was updated!');
            }
          
        } catch (err) {
            console.error(err.message);
        }
    });

    // delete a rose

    app.delete("/roses/:id", checkValid, async (req,res) => {
        try {
            const {id} =req.params;
            const delateRoses = await pool.query("DELETE FROM roses WHERE rose_id = $1", [id]);
            res.json("Rose was deleted!")

        } catch (err) {
            console.error(err.message);
        }
    })

// create buyer

app.post("/buyers", checkValid, async (req, res)=>{

    try{
        const input = req.body;
        const isUserExist =await pool.query(
            "SELECT * FROM buyers WHERE (name ILIKE $1 OR email ILIKE $2) AND email !=$3  ", [input.firstName, input.meil, ""]
        );
        if (isUserExist.rows[0]){
            console.log("User exist");
            return res.status(200).json({
                message:"User exist",
                isExist: true
                
            });
        } else {
            const newBuyer = await pool.query(
            "INSERT INTO buyers (name, address, city, phone, email) VALUES ($1,$2, $3, $4, $5) RETURNING *",
            [input.firstName, input.address, input.city, input.phone, input.meil]
            );
            console.log("The buyer was added in the base!"+ newBuyer.rows[0]);
            res.status(200).json({
                message:"Buyer added!",
                isExist: false
            });

        };
      
    } catch (err) {
        console.error(err.message);
    }
});

// get all buyers

app.get("/buyers", checkValid, async(req, res) => {
    try {
        const allBuyers = await pool.query("SELECT * FROM buyers ORDER BY buyer_id DESC");
        res.json(allBuyers.rows);
 
    } catch (err) {
        console.error(err.message);
    }
 });

//  delete buyer or buyers needed futher works
app.delete("/buyers/:selected", checkValid, async (req,res) => {

    console.log("linija 208" +req.params);
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

app.put("/buyers/:id", checkValid, async (req, res) => {
    try {
        const {id} = req.params;
        const {input} = req.body;
        const isUserExist =await pool.query(
            "SELECT * FROM buyers WHERE (name ILIKE $1 OR email ILIKE $2) AND email != $3 AND buyer_id != $4", [input.firstName, input.meil, "", input.buyer_id]
        );
        if (isUserExist.rows[0]){
            console.log("User exist");
            return res.status(200).json({
                message:"User exist",
                isExist: true
                
            });
        } else {
            const updateBuyer = await pool.query("UPDATE buyers SET name = $1, address = $2, city = $3, phone = $4, email = $5 WHERE buyer_id = $6",
            [input.firstName, input.address, input.city, input.phone, input.meil, input.buyer_id]
            );
            console.log("Buyer was updated!");
            res.status(200).json({
                message:" Buyer was updated!",
                isExist: false
            });

        }; 

    } catch (err) {
        console.error(err.message);
    }
});

app.get("/buyers_for_orders", checkValid, async(req, res) => {
    try {
        const allBuyers = await pool.query("SELECT buyer_id, name, address FROM buyers ORDER BY name ");
        res.json(allBuyers.rows);
 
    } catch (err) {
        console.error(err.message);
    }
 });

// get a user
app.post("/users", async(req, res)=>{
    try{


        const {email, password} = req.body;
        console.log(email, password);
    

        const findUser =await pool.query(
            "SELECT * FROM users WHERE email =$1 AND userPassword =$2", [email, password]
        );
        if (findUser.rows[0]){
             const token = jwt.sign({
                email:findUser.rows[0].email,
                user_id:findUser.rows[0].user_id,
            }, process.env.JWT_KEY, {
                expiresIn: "1h"
            });
            console.log("token kreiran");
            return res.status(200).json({
                message:"Auth successful",
                token: token
            });
        } else {
            res.status(409).json({
                messasge: "user is not registrated!"
            });
        }
    }
    catch (err) {
        console.error(err.message);
    
    }
});


 
app.listen(5000, () => {
    console.log("server has started on port 5000");

});
