const CommentsList = ({ comments }) => (
  <>
    {comments.map((comment, key) => (
      <div className="comments" key={key}>
        <h3>Comments:</h3>
        <h4>{comment.username}</h4>
        <p>{comment.text}</p>
      </div>
    ))}
  </>
);

export default CommentsList;
