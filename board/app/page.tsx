import { Button, Container } from 'react-bootstrap'
import { getAllPost } from './utils/database'
import List from './list'

export default async function Home() {
  try {
    const posts = await getAllPost()

    return (
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Posts</h1>
          <Button variant="primary" href="/write">
            Write Post
          </Button>
        </div>
        <div>
          <List posts={posts ? JSON.parse(JSON.stringify(posts)) : undefined} />
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
