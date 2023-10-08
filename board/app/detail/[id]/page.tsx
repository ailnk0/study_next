import { getPostById } from '@/app/utils/database'
import React from 'react'
import { Container } from 'react-bootstrap'

export default async function Detail(props: any) {
  const post = await getPostById(props.params.id)

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{post?.title}</h5>
          <p className="card-text">{post?.content}</p>
          <small className="text-body-secondary">{new Date(post?.modified).toLocaleString()}</small>
        </div>
      </div>
    </Container>
  )
}
