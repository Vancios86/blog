const UpvotesSection = ({ articleName, articleInfo, setArticleInfo }) => {
  const upvoteArticle = async () => {
    const result = await fetch(`/api/articles/${articleName}/upvote`, {
      method: "POST",
    });
    const resultBody = await result.json();
    setArticleInfo(resultBody);
  };
  return (
    <div id="upvotes-section">
      <button onClick={() => upvoteArticle()}>Add Upvote</button>
      <h4>This post received {articleInfo} upvotes</h4>
    </div>
  );
};

export default UpvotesSection;
