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
      <button onClick={() => upvoteArticle()}>Upvote</button>
      <p>This post received {articleInfo} upvotes</p>
    </div>
  );
};

export default UpvotesSection;
