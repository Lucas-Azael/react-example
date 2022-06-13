import { useEffect, useState, useCallback } from 'react';
import './Home.css';
import { Posts } from '../../components/Posts/index';
import { loadPosts } from '../../utils/load-posts';
import Button from '../../components/Button';
import { Input } from '../../components/Input /input';

export const Home = () => {
  

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts =!!searchValue ? 
      posts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLocaleLowerCase()) || post.body.toLocaleLowerCase().includes(
            searchValue.toLocaleLowerCase()
          );
      }) 
    : posts;
  
  
  const getPosts = useCallback(async(page, postsPerPage) => {

    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos)
  }) 

  const loadMorePosts = () => {
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
      posts.push(...nextPosts);
  
      setPosts(posts);
      setPage(nextPage)
  }

  useEffect(() => {
    getPosts(0, postsPerPage)
  }, [getPosts, postsPerPage]) //chama o efeito apenas quando getPosts ou postsPerPage sofrem mutação
  

  const handleChange = (e) => {
    const {value} = e.target;
    setSearchValue(value);
  }

  const noMorePosts = page + postsPerPage >= allPosts.length;
  
  return(
      <section className="container">
        {!!searchValue && (
        <>
        <h1>Search Value: {searchValue}</h1><br /><br/>
        </>
      )}
        <Input handleChange={handleChange} value={searchValue}/>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}
        {filteredPosts.length === 0 && (
          <p>Nenhum post encontrado</p>
        )}
        <div className="btn-center">
          {!searchValue && (
            <Button label='Carregar mais posts' onClick={loadMorePosts} disabled={noMorePosts}/>
          )}
        </div>
      </section>
    )
}
export default Home;
