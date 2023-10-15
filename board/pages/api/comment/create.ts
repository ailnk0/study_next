import { mongoClient } from '@/utils/database'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'Request method must be POST' })
    }

    const jsonReq = JSON.parse(req.body)
    const comment: string = jsonReq.comment.toString().trim()
    const parent: string = jsonReq.parent.toString().trim()
    if (comment.length === 0) {
      return res.status(400).json({ message: 'Comment cannot be empty' })
    }
    if (parent.length === 0) {
      return res.status(400).json({ message: 'Parent cannot be empty' })
    }

    const session = await getServerSession(req, res, authOptions)
    const email = session?.user?.email?.trim() ?? ''
    if (email.length === 0) {
      return res.status(400).json({ message: 'cannot read user info' })
    }

    let doc = {
      comment: comment as string,
      created: new Date(),
      updated: new Date(),
      writer: email as string,
      parent: new ObjectId(parent as string)
    }

    const newComment = await mongoClient.db('forum').collection('comment').insertOne(doc)
    if (!newComment) {
      return res.status(400).json({ message: 'Failed to create new comment' })
    }

    res.redirect(302, '/')
  } catch (e) {
    return res.status(500).json(e)
  }
}
