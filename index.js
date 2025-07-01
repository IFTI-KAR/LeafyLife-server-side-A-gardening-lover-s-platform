const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nrfuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("gardenDB");
    const gardenerCollection = db.collection("gardeners");
    const tipsCollection = db.collection("tips");
    // POST /gardeners - Save new gardener to DB
    app.post('/gardeners', async (req, res) => {
    try {
        const gardener = req.body;
        if (!gardener.email) {
        return res.status(400).send({ message: 'Email is required' });
        }

        // Optional: prevent duplicates by email
        const existing = await gardenerCollection.findOne({ email: gardener.email });
        if (existing) {
        return res.status(409).send({ message: 'Gardener already exists' });
        }

        const result = await gardenerCollection.insertOne(gardener);
        res.status(201).send({ message: 'Gardener saved', insertedId: result.insertedId });
    } catch (error) {
        res.status(500).send({ message: 'Failed to save gardener', error });
    }
    });


    // --- gardener route
    app.get('/gardeners/featured', async (req, res) => {
      const activeGardeners = await gardenerCollection.find({ active: true }).limit(6).toArray();
      res.send(activeGardeners);
    });
    // GET all gardeners (not just featured)
    app.get('/gardeners', async (req, res) => {
    try {
        const gardeners = await gardenerCollection.find().toArray();
        res.send(gardeners);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch gardeners', error });
    }
    });


    // --- tips routes

    // 🔧 PLACE THIS BEFORE `/tips/:id` TO AVOID COLLISION
    app.get('/tips/user', async (req, res) => {
      const email = req.query.email;
      if (!email) return res.status(400).send([]);
      try {
        const tips = await tipsCollection.find({ email }).toArray();
        res.send(tips);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch user tips.', error });
      }
    });

    app.get('/tips/trending', async (req, res) => {
      const trendingTips = await tipsCollection.find().limit(6).toArray();
      res.send(trendingTips);
    });

    app.post('/tips', async (req, res) => {
      try {
        const tip = req.body;
        const result = await tipsCollection.insertOne(tip);
        res.status(201).send({ message: 'Tip submitted successfully!', insertedId: result.insertedId });
      } catch (error) {
        res.status(500).send({ message: 'Failed to submit tip.', error });
      }
    });

    app.get('/tips', async (req, res) => {
      try {
        const publicTips = await tipsCollection.find({ availability: "Public" }).toArray();
        res.send(publicTips);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch tips.', error });
      }
    });

    app.get('/tips/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const tip = await tipsCollection.findOne({ _id: new ObjectId(id) });
        if (!tip) return res.status(404).send({ message: 'Tip not found' });
        res.send(tip);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching tip', error });
      }
    });

    app.patch('/tips/like/:id', async (req, res) => {
      const id = req.params.id;
      try {
        const result = await tipsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { totalLiked: 1 } }
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to like tip', error });
      }
    });

    app.delete('/tips/:id', async (req, res) => {
      const id = req.params.id;
      try {
        const result = await tipsCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to delete tip.', error });
      }
    });


    // Update tip by ID
app.patch('/tips/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

    try {
        const result = await tipsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
        );
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Failed to update tip.', error });
    }
    });


    // --- root
    app.get('/', (req, res) => {
      res.send('🌱 Garden server is blooming!');
    });

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`🚀 Garden server running on port ${port}`);
});
