import { updatePostById } from '@/utils/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'Request method must be POST' })
    }
    const { _id, title, content } = req.body
    if (_id.trim() === '') {
      return res.status(400).json({ message: '_id cannot be empty' })
    }
    if (title.trim() === '') {
      return res.status(400).json({ message: 'Title cannot be empty' })
    }
    if (content.trim() === '') {
      return res.status(400).json({ message: 'Content cannot be empty' })
    }

    let doc = {
      title: title,
      content: content,
      created: new Date(),
      updated: new Date(),
      writer: 'Farmer'
    }
    await updatePostById(_id, doc)

    res.redirect(302, '/')
  } catch (e) {
    return res.status(500).json(e)
  }
}
