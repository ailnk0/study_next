import { deletePostById } from '@/app/utils/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const _id = req.query._id as string
    if (!_id || _id.trim() === '') {
      return res.status(400).json({ message: '_id cannot be empty' })
    }

    await deletePostById(_id)

    res.redirect(302, '/')
  } catch (e) {
    return res.status(500).json(e)
  }
}
