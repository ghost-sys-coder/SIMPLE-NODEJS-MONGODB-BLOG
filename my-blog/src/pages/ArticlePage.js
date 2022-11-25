import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import articles from './article-content';

import { CommmentsList, AddCommentForm } from '../components/index';
import NotFoundPage from './NotFoundPage';

import useUser from '../hooks/useUser';

/**
 * ! Assume we are at Article --- localhost:3000/articles/learn-node
 */

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })
  
  const params = useParams();
  const articleId = params.articleId;

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    }

    loadArticleInfo();
  }, [articleId])

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  }
  /**
   * ! To Find The Article We Need
   */

  const article = articles.find(article => article.name === articleId);

  if (!article) {
    return <NotFoundPage />
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className='upvotes-section'>
        {user ? 
          <button onClick={addUpvote}>upvote</button> :
          <button>Log in to upvote</button>
        }
        <p>This article has { articleInfo.upvotes} upvotes(s)</p>
      </div>
      {article.content.map((paragraph, index) => (
        <p key={index}>{ paragraph }</p>
      ) )}
      <CommmentsList comments={articleInfo.comments} />
      {user ?
      <AddCommentForm
        articleName={articleId}
        onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
      /> :
      <button>Log in to add a Comment</button>
      }
    </>
  )
}

export default ArticlePage