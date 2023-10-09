'use client'

import { WithId, Document } from 'mongodb'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

export default function List({ posts }: { posts: WithId<Document>[] | undefined }) {
  function deletePost(_id: string) {
    fetch(`/api/post/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id })
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          window.location.reload()
        } else {
          throw new Error('Failed to delete post')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      {posts?.map((post, index) => (
        <div key={index} className="card mb-2">
          <div className="card-body">
            <Link className="text-decoration-none" href={`/detail/${post?._id}`}>
              <h5 className="card-title">{post?.title}</h5>
              <p className="card-text">{post?.content}</p>
            </Link>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-body-secondary">{post?.updated.toLocaleString()}</small>
              <div>
                <Button className="me-1 btn-sm" variant="secondary" href={`/edit/${post?._id}`}>
                  Edit
                </Button>
                <Button
                  className="me-1 btn-sm"
                  variant="secondary"
                  onClick={() => {
                    deletePost(post?._id.toString())
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
