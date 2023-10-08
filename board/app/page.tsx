import { getAllPost } from './utils/database'

export default async function Home() {
  try {
    const posts = await getAllPost()

    return (
      <div>
        <div>
          <h1>Posts</h1>
        </div>
        <div>
          {posts?.map((post, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <h5 className="card-title">{post?.title}</h5>
                <p className="card-text">{post?.content}</p>
                <small className="text-body-secondary">
                  {new Date(post?.modified).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <div>There are {posts?.length ?? 0} posts.</div>
        </div>
      </div>
    )
  } catch (e) {
    console.log(e)
  }
}
