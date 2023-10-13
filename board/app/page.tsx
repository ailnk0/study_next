import { Container } from 'react-bootstrap'
import { getAllPost } from '../utils/database'
import List from '../components/list'
import ActionBar from '../components/actionBar'

export const dynamic = 'force-dynamic'

export default async function Home() {
  try {
    const posts = await getAllPost()

    return (
      <Container>
        <ActionBar />
        <List posts={posts ? JSON.parse(JSON.stringify(posts)) : undefined} />
      </Container>
    )
  } catch (e) {
    console.log(e)
  }
}
