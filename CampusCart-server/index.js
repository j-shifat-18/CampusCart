const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;


// campusCart
// /0QkzOXUUEGyyMILO


app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://campusCart:0QkzOXUUEGyyMILO@cluster0.psjt8aa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db("campusCart").collection("users");
    const productsCollection = client.db("campusCart").collection("products");

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();

      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
     
      res.send(result);
    });



    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });


    app.post("/users", async (req, res) => {
      const userData = req.body;
      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const productData = req.body;
      const result = await productsCollection.insertOne(productData);
      res.send(result);
    });




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
