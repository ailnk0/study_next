import { Container } from 'react-bootstrap'
import { getAllPost } from './utils/database'
import Link from 'next/link'

export default async function Home() {
  try {
    const posts = await getAllPost()

    return (
      <Container>
        <div>
          <h1>Posts</h1>
        </div>
        <div>
          {posts?.map((post, index) => (
            <div key={index} className="card mb-2">
              <Link className="card-body text-decoration-none" href={`/detail/${post?._id}`}>
                <h5 className="card-title">{post?.title}</h5>
                <p className="card-text">{post?.content}</p>
                <small className="text-body-secondary">
                  {new Date(post?.modified).toLocaleString()}
                </small>
              </Link>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <div>There are {posts?.length ?? 0} posts.</div>
        </div>
      </Container>
    )
  } catch (e) {
    console.log(e)
  }
}
