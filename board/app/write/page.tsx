import { Container } from 'react-bootstrap'

export default function WritePost() {
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Write Post</h1>
        <div></div>
      </div>
      <form action="/api/post/new" method="POST">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" name="title" />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea className="form-control" name="content" />
        </div>
        <button type="submit" className="btn btn-primary">
          Write Post
        </button>
      </form>
    </Container>
  )
}
