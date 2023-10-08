import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI || ''

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function checkMongoDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mongoClient.connect()
    // Send a ping to confirm a successful connection
    await mongoClient.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')

    const db = mongoClient.db('forum')
    let result = await db.collection('post').find().toArray()
    return result
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close()
  }
}

async function getAllPost() {
  try {
    await mongoClient.connect()
    return await mongoClient.db('forum').collection('post').find().toArray()
  } catch (e) {
    console.log(e)
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close()
  }
}

export { mongoClient, checkMongoDB, getAllPost }
