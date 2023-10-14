'use client'

import { Form, Button, Container, Row, Col } from 'react-bootstrap'

export default function Register() {
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Register</h1>
        <div></div>
      </div>

      <Form method="POST" action="/api/auth/signup">
        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control name="name" type="text" placeholder="Enter name" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control name="email" type="email" placeholder="Enter email" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control name="password" type="password" placeholder="Password" />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  )
}
