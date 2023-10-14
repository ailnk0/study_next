import { mongoClient } from '@/utils/database'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('i am create comment api')

  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'Request method must be POST' })
    }

    const { comment, parent } = JSON.parse(req.body)
    if (comment.trim() === '') {
      return res.status(400).json({ message: 'Comment cannot be empty' })
    }
    if (parent.trim() === '') {
      return res.status(400).json({ message: 'Parent cannot be empty' })
    }

    const session = await getServerSession(req, res, authOptions)
    const email = session?.user?.email ?? ''
    if (email.trim() === '') {
      return res.status(400).json({ message: 'cannot read user info' })
    }

    let doc = {
      comment: comment,
      created: new Date(),
      updated: new Date(),
      writer: email,
      parent: parent
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
