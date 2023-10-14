import { NextApiRequest, NextApiResponse } from 'next'
import { insertUser, mongoClient } from '@/utils/database'
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Request method must be POST' })
  }

  // Check if name, email, password are provided
  const { name, email, password } = req.body
  if (name.trim() === '') {
    return res.status(400).json({ message: 'Name cannot be empty' })
  }
  if (email.trim() === '') {
    return res.status(400).json({ message: 'Email cannot be empty' })
  }
  if (password.trim() === '') {
    return res.status(400).json({ message: 'Password cannot be empty' })
  }

  // Check if email is valid
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  // Check if password is strong enough
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' })
  }

  // Check if email already exists
  const db = mongoClient.db('forum')
  const user = await db.collection('user').findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({ message: 'Email already exists' })
  }

  // Hash password
  const hash = await bcrypt.hash(req.body.password, 10)
  req.body.password = hash

  // Check if there is no error, then insert user into database
  const newUser = await insertUser(req.body)
  if (!newUser) {
    return res.status(400).json({ message: 'Failed to add new user' })
  }

  return res.status(200).json({ message: 'Success sign-up' })
}
