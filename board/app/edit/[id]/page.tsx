import { Container } from 'react-bootstrap'
import { getPostById } from '../../utils/database'

export default async function EditPost(props: any) {
  const post = await getPostById(props.params.id)

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Edit Post</h1>
        <div></div>
      </div>
      <form action="/api/post/edit" method="POST">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" name="title" defaultValue={post?.title} />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea className="form-control" name="content" defaultValue={post?.content} />
        </div>
        <input type="hidden" defaultValue={post?._id.toString()} name="_id" />
        <button type="submit" className="btn btn-primary">
          Edit Post
        </button>
      </form>
    </Container>
  )
}
