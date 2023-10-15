import { mongoClient } from '@/utils/database'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(400).json({ message: 'Request method must be GET' })
    }

    const parent = (req.query.parent as string) ?? ''
    if (parent.trim() === '') {
      return res.status(400).json({ message: 'Parent cannot be empty' })
    }

    const comments = await mongoClient
      .db('forum')
      .collection('comment')
      .find({ parent: new ObjectId(parent) })
      .toArray()

    res.status(200).json(JSON.stringify(comments))
  } catch (e) {
    return res.status(500).json(e)
  }
}
