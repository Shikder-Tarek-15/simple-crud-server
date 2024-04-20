const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json);

//shikdertarek2019
//gnVGILs4FymGqFFR

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://shikdertarek2019:gnVGILs4FymGqFFR@cluster0.rtcbpiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("This is mongo boss runnning");
});

app.listen(port, () => {
  console.log("I am running boss with", port);
});