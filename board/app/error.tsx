'use client'

import { Button, Container } from 'react-bootstrap'

export default function Error(props: any) {
  console.log(typeof props)
  console.log('error', props.error)
  return (
    <Container>
      <h4>Custom Page</h4>
      <h4>{props.error.toString()}</h4>
      <Button onClick={props.reset}>Reset</Button>
    </Container>
  )
}
