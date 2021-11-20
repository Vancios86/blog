import articleContent from "./article-content";
import ArticlesList from "../components/ArticlesList";
import Page404 from "./Page404";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);

  if (!article) return <Page404 />;

  const showOtherArticles = articleContent.filter(
    (article) => article.name !== name
  );

  return (
    <>
      <div className="article-page">
        <h1>{article.title}</h1>
        {article.content.map((paragraph, key) => (
          <p key={key}>{paragraph}</p>
        ))}
      </div>
      <h3>Check out other articles</h3>
      <ArticlesList articles={showOtherArticles} />
    </>
  );
};

export default ArticlePage;
