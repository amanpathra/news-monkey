import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(15)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let res = await fetch(url);
    props.setProgress(50)
    let data = await res.json();
    props.setProgress(70)
    // console.log(data)
    setArticles(data.articles)
    setTotalResults(data.totalRset)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews();
    document.title = `NewsMonkey - ${props.category[0].toUpperCase() + props.category.slice(1)}`;
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let res = await fetch(url);
    let data = await res.json();
    // console.log(data)
    setArticles(articles.concat(data.articles));
    setTotalResults(data.totalResults);
  };

  return (
    <>
      <h2 className='mt text-center'>NewsMonkey - Top {props.category[0].toUpperCase() + props.category.slice(1)} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map(e => {
              return <div key={e.url} className="col-md-3">
                <Newsitem title={e.title} description={e.description} imgUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
}

export default News