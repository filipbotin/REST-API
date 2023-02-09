
const { json } = require("body-parser");	
const express = require("express")
const app = express()
const fs = require("fs");

app.use(express.json());


app.get("/products", (req, res) => {
    fs.readFile("products.json", function (err, data) {
        if (err) {
            return res.status(404).send("product not found");
        }
        const products = JSON.parse(data);
        res.send(products);
        return;
        })
    });

app.post("/products/add", (req, res) => {
    fs.readFile("products.json", function (err, data) {
        if (err) {
            return res.status(404).send("product not found");
        }
        const products = JSON.parse(data);
        products.push(req.body);

        fs.writeFile("products.json", JSON.stringify(products, null, 2), function (err) {
            if (err) {
                return res.status(404).send("products not found");
            } else {
                res.send(products);
            }
        })});
    });

       
app.delete("/products/:id", (req, res) => {
     fs.readFile("products.json", (err, data) => {
        if (err) {
            return res.status(404).send("products not found");
          }
          let products = JSON.parse(data);
         const id = products.find((products) => products.id == req.params.id);
         const index = products.findIndex((i) => i.id === products.id);
        products.splice(index, 1);

        fs.writeFile("products.json", JSON.stringify(products, null, 2), function (err) {
            if (err) {
                return res.status(404).send("products not found");
            } else {
                res.status(200).json("products");

            }})});
    });


app.put("/products/:id"), (req, res) => {
    fs.readFile("products.json", function (err, data) {
        const products = JSON.parse(data);
         const id = products.find((products) => products.id == req.params.id);
        if (err) {
              res.status(404).send("products not found")
         } else {
            products.find((id) => {
                if (id.id == req.params.id) {
                    id.name = req.body.name;
                    id.type = req.body.type;
                    id.price = req.body.price;
                    id.id == req.body.id;
                } 
            });
    }
    fs.writeFile("products.json", JSON.stringify(products, null, 2), function (err) {
        if (err) {
            return res.status(404).send("products not found");
        } else {
            res.send(products);
        }
        });
    });
};

app.listen(3000, () => console.log("Server igång och springer på http://localhost:3000"));