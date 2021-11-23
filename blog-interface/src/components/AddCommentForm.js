import { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  const addComment = async () => {
    const apiCallResponse = await fetch(
      `/api/articles/${articleName}/add-comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, text: comment }),
      }
    );
    const responseBody = await apiCallResponse.json();
    setArticleInfo(responseBody);
    setUsername("");
    setComment("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add a comment</h3>
      <label>
        Name:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </label>
      <button onClick={() => addComment()}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
