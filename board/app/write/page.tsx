'use client'

import { Button, Container, Form } from 'react-bootstrap'

export default function WritePost() {
  return (
    <Container>
      <Form action="/api/post/new" method="POST">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} name="content" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Write Post
        </Button>
      </Form>
    </Container>
  )
}
