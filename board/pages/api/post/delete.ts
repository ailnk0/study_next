import { deletePostById } from '@/app/utils/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(req.body)

    if (req.method !== 'DELETE') {
      return res.status(400).json({ message: 'Request method must be DELETE' })
    }
    const { _id } = req.body
    if (_id.trim() === '') {
      return res.status(400).json({ message: '_id cannot be empty' })
    }

    await deletePostById(_id)

    res.redirect(302, '/')
  } catch (e) {
    return res.status(500).json(e)
  }
}
