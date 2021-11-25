import articleContent from "./article-content";
import ArticlesList from "../components/ArticlesList";
import CommentsList from "../components/CommentsList";
import UpvotesSection from "../components/UpvotesSection";
import AddCommentForm from "../components/AddCommentForm";
import Page404 from "./Page404";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ArticlePage = () => {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const apiCallResponse = await fetch(`/api/articles/${name}`);
      const responseBody = await apiCallResponse.json();
      setArticleInfo(responseBody);
    };
    fetchData();
  }, [name]);

  if (!article) return <Page404 />;

  const showOtherArticles = articleContent.filter(
    (article) => article.name !== name
  );

  return (
    <>
      <div className="article-page">
        <h1>{article.title}</h1>
        <div className="article-page-image">
          <img
            src="https://source.unsplash.com/8n00CqwnqO8"
            loading="lazy"
            alt=""
          />
        </div>
        {article.content.map((paragraph, key) => (
          <p key={key}>{paragraph}</p>
        ))}
        <UpvotesSection
          articleName={name}
          articleInfo={articleInfo.upvotes}
          setArticleInfo={setArticleInfo}
        />
        <CommentsList comments={articleInfo.comments} />
        <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      </div>
      <h3>Check out other articles</h3>
      <ArticlesList articles={showOtherArticles} />
    </>
  );
};

export default ArticlePage;
