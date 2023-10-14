import Comments from '@/components/comments'
import { getPostById } from '@/utils/database'
import React from 'react'
import { Container } from 'react-bootstrap'

export default async function Detail(props: any) {
  const post = await getPostById(props.params.id)

  return (
    <Container className="vh-100">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Detail</h1>
        <div></div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{post?.title}</h5>
          <p className="card-text">{post?.content}</p>
          <small className="text-body-secondary">{post?.updated.toLocaleString()}</small>
        </div>
        <Comments parent={post?._id.toString()} />
      </div>
    </Container>
  )
}
