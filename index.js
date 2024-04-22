const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//shikdertarek2019
//gnVGILs4FymGqFFR

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://shikdertarek2019:gnVGILs4FymGqFFR@cluster0.rtcbpiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const uri = "mongodb://127.0.0.1:27017";

// const uri = "mongodb://localhost:27017/";

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

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.get("/users", async (req, res) => {
      const user = userCollection.find();
      const result = await user.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const query = { _id: new ObjectId(id) };

      const options = { upsert: true };
      const updateUser = {
        $set: {
          email: user.email,
          password: user.password,
        },
      };
      const result = await userCollection.updateOne(query, updateUser, options);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("user data: ", user);
      // res.send({ name: "TArek" });

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Please delete this: ", id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("This is mongo boss runnning");
});

app.listen(port, () => {
  console.log("I am running boss with", port);
});
