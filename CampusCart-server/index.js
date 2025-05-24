import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { chatBot } from "./chatbot/chatbot.js";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import chatRoutes from './routes/chatRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// campusCart
// /0QkzOXUUEGyyMILO

app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = process.env.MONGODB_URI || "mongodb+srv://campusCart:0QkzOXUUEGyyMILO@cluster0.psjt8aa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB Connection
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Chat routes
app.use('/chats', chatRoutes);

async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("campusCart").collection("users");
    const productsCollection = client.db("campusCart").collection("products");
    const chatsCollection = client.db("campusCart").collection("chats");
    const reviewsCollection = client.db("campusCart").collection("reviews");
    const wishlistsCollection = client.db("campusCart").collection("wishlists");

    // User routes
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

    app.post("/users", async (req, res) => {
      const userData = req.body;
      const result = await usersCollection.insertOne(userData);
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

    // Product routes
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

    // New search and filter endpoints
    app.get("/products/search", async (req, res) => {
      try {
        const { query, category, minPrice, maxPrice, condition, sortBy } = req.query;
        let filter = {};

        // Text search
        if (query) {
          filter.$or = [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ];
        }

        // Category filter
        if (category) {
          filter.category = category;
        }

        // Price range filter
        if (minPrice || maxPrice) {
          filter.price = {};
          if (minPrice) filter.price.$gte = parseFloat(minPrice);
          if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        // Condition filter
        if (condition) {
          filter.condition = condition;
        }

        // Sorting
        let sort = {};
        if (sortBy === 'price_asc') sort = { price: 1 };
        else if (sortBy === 'price_desc') sort = { price: -1 };
        else if (sortBy === 'newest') sort = { createdAt: -1 };
        else sort = { createdAt: -1 }; // Default sort by newest

        const result = await productsCollection
          .find(filter)
          .sort(sort)
          .toArray();

        res.json(result);
      } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).send('Error searching products');
      }
    });

    app.get("/products/categories", async (req, res) => {
      try {
        const categories = await productsCollection.distinct("category");
        res.json(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Error fetching categories');
      }
    });


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

    // Chatbot routes
    app.post('/chatbot', async (req, res) => {
      try {
        const { message } = req.body;
        if (!message) {
          return res.status(400).send('Message is required');
        }
        const response = await chatBot(message);
        res.json(response);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
      }
    });


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
    // Rating and Review endpoints
    app.post("/reviews", async (req, res) => {
      try {
        const { userId, productId, rating, comment } = req.body;

        // Validate rating
        if (rating < 1 || rating > 5) {
          return res.status(400).send('Rating must be between 1 and 5');
        }

        const review = {
          userId,
          productId,
          rating,
          comment,
          createdAt: new Date()
        };

        const result = await reviewsCollection.insertOne(review);

        // Update product average rating
        const productReviews = await reviewsCollection.find({ productId }).toArray();
        const avgRating = productReviews.reduce((acc, curr) => acc + curr.rating, 0) / productReviews.length;

        await productsCollection.updateOne(
          { _id: new ObjectId(productId) },
          { $set: { averageRating: avgRating, totalReviews: productReviews.length } }
        );

        res.json({ ...review, _id: result.insertedId });
      } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).send('Error creating review');
      }
    });

    app.get("/reviews/product/:productId", async (req, res) => {
      try {
        const { productId } = req.params;
        const reviews = await reviewsCollection
          .aggregate([
            { $match: { productId } },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
              }
            },
            { $unwind: "$user" },
            {
              $project: {
                _id: 1,
                rating: 1,
                comment: 1,
                createdAt: 1,
                "user.name": 1,
                "user.email": 1
              }
            }
          ])
          .toArray();

        res.json(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Error fetching reviews');
      }
    });

    app.get("/reviews/user/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        const reviews = await reviewsCollection
          .find({ userId })
          .toArray();

        res.json(reviews);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        res.status(500).send('Error fetching user reviews');
      }
    });

    // Wishlist endpoints
    app.post("/wishlist", async (req, res) => {
      try {
        const { userId, productId } = req.body;

        // Check if product exists
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
        if (!product) {
          return res.status(404).send('Product not found');
        }

        // Check if already in wishlist
        const existingWishlist = await wishlistsCollection.findOne({ userId, productId });
        if (existingWishlist) {
          return res.status(400).send('Product already in wishlist');
        }

        const wishlistItem = {
          userId,
          productId,
          addedAt: new Date()
        };

        const result = await wishlistsCollection.insertOne(wishlistItem);
        res.json({ ...wishlistItem, _id: result.insertedId });
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).send('Error adding to wishlist');
      }
    });

    app.delete("/wishlist/:userId/:productId", async (req, res) => {
      try {
        const { userId, productId } = req.params;
        const result = await wishlistsCollection.deleteOne({ userId, productId });

        if (result.deletedCount === 0) {
          return res.status(404).send('Wishlist item not found');
        }

        res.json({ message: 'Removed from wishlist' });
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        res.status(500).send('Error removing from wishlist');
      }
    });

    app.get("/wishlist/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        const wishlist = await wishlistsCollection
          .aggregate([
            { $match: { userId } },
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product"
              }
            },
            { $unwind: "$product" },
            {
              $project: {
                _id: 1,
                addedAt: 1,
                "product._id": 1,
                "product.name": 1,
                "product.price": 1,
                "product.image": 1,
                "product.description": 1
              }
            }
          ])
          .toArray();

        res.json(wishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).send('Error fetching wishlist');
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

  }
},


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

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("CampusCart API is running!");

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
