import React from "react";
import { Link } from "react-router-dom";
import articles from "./article-content";

const ArticlesList = () => {
  return (
    <>
      <h1>Articles</h1>
      {articles.map((article, key) => {
        return (
          <Link key={key} to={`/article/${article.name}`}>
            <h3>{article.title}</h3>
          </Link>
        );
      })}
    </>
  );
};

export default ArticlesList;
