import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

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

async function getForumPost() {
  await mongoClient.connect()
  return mongoClient.db('forum').collection('post')
}

async function getForumUser() {
  await mongoClient.connect()
  return mongoClient.db('forum').collection('user')
}

async function getAllPost() {
  try {
    const col = await getForumPost()
    return await col.find().toArray()
  } catch (e) {
    console.log(e)
  } finally {
    await mongoClient.close()
  }
}

async function getPostById(id: string) {
  try {
    const col = await getForumPost()
    return await col.findOne({ _id: new ObjectId(id) })
  } catch (e) {
    console.log(e)
  } finally {
    await mongoClient.close()
  }
}

async function insertPost(post: any) {
  try {
    const col = await getForumPost()
    const result = await col.insertOne(post)
    console.log(`Inserted post with id ${result.insertedId}`)
  } catch (e) {
    console.log(e)
  } finally {
    await mongoClient.close()
  }
}

async function updatePostById(id: string, newPostData: any) {
  try {
    const col = await getForumPost()
    const result = await col.updateOne({ _id: new ObjectId(id) }, { $set: newPostData })
    console.log(`Updated post with id ${id}`)
  } catch (e) {
    console.log(e)
  } finally {
    await mongoClient.close()
  }
}

async function deletePostById(id: string) {
  try {
    const col = await getForumPost()
    const result = await col.deleteOne({ _id: new ObjectId(id) })
    console.log(`Deleted post with id ${id}`)
  } catch (e) {
    console.log(e)
  } finally {
    await mongoClient.close()
  }
}

async function insertUser(user: any) {
  try {
    const col = await getForumUser()
    const result = await col.insertOne(user)
    console.log(`Inserted user with id ${result.insertedId}`)
    return result
  } catch (e) {
    console.log(e)
  } finally {
    await mongoClient.close()
  }
}

export {
  mongoClient,
  checkMongoDB,
  getAllPost,
  getPostById,
  insertPost,
  updatePostById,
  deletePostById,
  insertUser
}
