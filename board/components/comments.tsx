'use client'

import { useEffect, useState } from 'react'

export default function Comments(props: any) {
  const parent_id: string = props.parent as string

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const submitComment = () => {
    fetch(`/api/comment/create`, {
      method: 'POST',
      body: JSON.stringify({
        comment: comment,
        parent: parent_id
      })
    })
      .then((response) => {
        console.log(response)
        setComment('')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    fetch(`/api/comment/get?parent=${parent_id}`, {
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setComments(JSON.parse(data))
          })
        } else {
          console.log(response)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  })

  return (
    <ul className="list-group list-group-flush">
      {comments.map((comment: any, index) => {
        return (
          <li key={index} className="list-group-item">
            <div className="d-flex justify-content-between">
              <small className="text-body-secondary">{comment.writer}</small>
              <small className="text-body-secondary">
                {new Date(comment.created).toLocaleString()}
              </small>
            </div>
            {comment.comment}
          </li>
        )
      })}
      <div className="input-group">
        <input
          type="text"
          className="form-control m-2 border-0"
          name="comment"
          placeholder="Comment"
          aria-describedby="comment-btn"
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button
          className="btn btn-secondary border-0"
          type="button"
          id="comment-btn"
          onClick={submitComment}
        >
          Submit
        </button>
      </div>
    </ul>
  )
}
