'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from 'react-bootstrap'

export default function LoginBtn() {
  const session = useSession()
  return (
    <div>
      {session?.data ? (
        <Button className="ms-2" variant="success" onClick={() => signOut()}>
          {session?.data?.user?.name ?? ''} Logout
        </Button>
      ) : (
        <Button className="ms-2" variant="primary" onClick={() => signIn()}>
          Login
        </Button>
      )}
    </div>
  )
}
