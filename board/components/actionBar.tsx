'use client'

import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'
import { Button } from 'react-bootstrap'
import LoginBtn from './loginBtn'

export default function ActionBar() {
  return (
    <SessionProvider>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Posts</h1>
        <div className="d-flex">
          <Button className="ms-2" variant="primary" href="/write">
            Write Post
          </Button>
          <LoginBtn />
        </div>
      </div>
    </SessionProvider>
  )
}
