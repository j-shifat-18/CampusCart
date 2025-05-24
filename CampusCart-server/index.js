import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { chatBot } from "./chatbot/chatbot.js";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// campusCart
// /0QkzOXUUEGyyMILO

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://campusCart:0QkzOXUUEGyyMILO@cluster0.psjt8aa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    const usersCollection = client.db("campusCart").collection("users");
    const productsCollection = client.db("campusCart").collection("products");
    const chatsCollection = client.db("campusCart").collection("chats");

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.get("/updateprofile/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      console.log(result);
      res.json(result);
    });

    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    // GET /products?university=IUT
    // app.get("/products", async (req, res) => {
    //   const userUniversity = req.query.university;

    //   const posts = await productsCollection
    //     .find({
    //       $or: [
    //         { visibility: "public" },
    //         { visibility: "university-only", university: userUniversity },
    //       ],
    //     })
    //     .toArray();

    //   res.send(posts);
    // });

    app.get("/products/featuredProducts", async (req, res) => {
      const result = await productsCollection
        .aggregate([{ $limit: 6 }])
        .toArray();
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

    app.patch("/updateProduct/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedProduct = req.body;
      const updateDoc = {
        $set: updatedProduct,
      };
      const result = await productsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.patch("/updateprofile/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateProfile = req.body;
      const updateDoc = {
        $set: updateProfile,
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    // Chat endpoints
    app.post("/chats", async (req, res) => {
      try {
        const { productId, sellerId, buyerId, initialMessage } = req.body;

        // Check if chat already exists
        const existingChat = await chatsCollection.findOne({
          productId,
          sellerId,
          buyerId,
        });

        if (existingChat) {
          return res.json(existingChat);
        }

        // Create new chat
        const chatData = {
          productId,
          sellerId,
          buyerId,
          messages: [
            {
              senderId: buyerId,
              content: initialMessage,
              timestamp: new Date(),
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await chatsCollection.insertOne(chatData);
        res.json({ ...chatData, _id: result.insertedId });
      } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).send("Error creating chat");
      }
    });

    app.get("/chats/:userId", async (req, res) => {
      try {
        const userId = req.params.userId;
        const chats = await chatsCollection
          .find({
            $or: [{ sellerId: userId }, { buyerId: userId }],
          })
          .toArray();
        res.json(chats);
      } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).send("Error fetching chats");
      }
    });

    app.post("/chats/:chatId/messages", async (req, res) => {
      try {
        const chatId = req.params.chatId;
        const { senderId, content } = req.body;

        const message = {
          senderId,
          content,
          timestamp: new Date(),
        };

        const result = await chatsCollection.updateOne(
          { _id: new ObjectId(chatId) },
          {
            $push: { messages: message },
            $set: { updatedAt: new Date() },
          }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).send("Chat not found");
        }

        res.json(message);
      } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send("Error sending message");
      }
    });

    app.get("/chats/:chatId/messages", async (req, res) => {
      try {
        const chatId = req.params.chatId;
        const chat = await chatsCollection.findOne({
          _id: new ObjectId(chatId),
        });

        if (!chat) {
          return res.status(404).send("Chat not found");
        }

        res.json(chat.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Error fetching messages");
      }
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
  res.send("Hello World!");
});
app.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).send("Message is required");
    }
    const response = await chatBot(message);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred");
  }
});

app.get("/chatbotImage", async (req, res) => {
  try {
    const response = await chatBot(
      "https://d1lfxha3ugu3d4.cloudfront.net/assets/system-images/made/assets/system-images/remote/https_d1lfxha3ugu3d4.cloudfront.net/exhibitions/images/2015_Sneaker_Culture_1._AJ_1_from_Nike_4000W.jpg_600_400.jpg",
      "Suggest me some similar products"
    );
    res.send(response);
  } catch (error) {
    // console.error(error);
    console.error(error);
    res.status(500).send("Error occurred");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
