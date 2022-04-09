import style from './CommentCard.module.css'

const DetailCard = ({ comment, handleDeleteComment, locationDetails, user }) => {
  return ( 
    <>
      <tr>
        <td>{comment.content}</td>
        <td>{comment.owner.name}</td>
        {user.profile === comment.owner._id ?
          <td>
            <button 
              className={style.btn}
              onClick={()=> handleDeleteComment(locationDetails._id, comment._id)}
            >
              X
            </button>
          </td>   
        :
          <td></td>
        }
      </tr> 
    </> 
  );
}
 
export default DetailCard;