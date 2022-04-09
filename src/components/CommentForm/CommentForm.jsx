import { useState } from 'react'
import style from "./CommentForm.module.css"

const CommentForm = ({ handleSubmit }) => {

  const [commentData, setCommentData] = useState({
    content: '',
  })

  const handleChange = evt => {
    setCommentData({ ...commentData, [evt.target.name]: evt.target.value })
  }

  return ( 
      <form onSubmit={(evt) => handleSubmit(evt, commentData)}>
        <div className="form-group mb-3">
          <div className={style.comment}>
            <label htmlFor="comment-input" className={style.label}>
              Comments
            </label>
            <input 
              type="text"
              className={style.input}
              id="comment-input"
              name="content"
              value={commentData.content}
              onChange={handleChange}
            />
            <button className = {style.btn}
              type="submit"
            >
              Add Comment
            </button>
          </div>
        </div>
        <br></br>
      </form>
   );
}
 
export default CommentForm;