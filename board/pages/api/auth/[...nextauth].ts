import { mongoClient } from '@/utils/database'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

/**
 * Authentication options for NextAuth.js
 */
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),

    CredentialsProvider({
      // 1. Automatic creation of login page form
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      // 2. executed when login request
      // Compare ID and password directly in DB
      // If the ID and password are correct, the result must be returned.
      // If the ID and password are incorrect, the result must be returned as null.
      async authorize(credentials) {
        const email = credentials?.email ?? ''
        if (email.trim() === '') {
          console.log('Email is empty')
          return null
        }

        const password = credentials?.password ?? ''
        if (password.trim() === '') {
          console.log('Password is empty')
          return null
        }

        let db = mongoClient.db('forum')
        let user = await db.collection('user').findOne({ email: email })
        if (!user) {
          console.log('No user found')
          return null
        }

        const pwcheck = await bcrypt.compare(password, user.password)
        if (!pwcheck) {
          console.log('Password does not match')
          return null
        }
        return user as any
      }
    })
  ],

  // 3. CredentialsProvider must require jwt
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  callbacks: {
    // 4. create jwt by user info from DB
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = {}
        token.user.name = user.name
        token.user.email = user.email
      }
      return token
    },
    // 5. Executed every time a user session is viewed
    session: async ({ session, token }: any) => {
      session.user = token.user
      return session
    }
  },

  secret: process.env.SECRET ?? '',
  adapter: MongoDBAdapter(Promise.resolve(mongoClient))
}

export default NextAuth(authOptions)
