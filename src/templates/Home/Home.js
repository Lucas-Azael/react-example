import { Component } from 'react';
import './Home.css';
import { Posts } from '../../components/Posts/index';
import { loadPosts } from '../../utils/load-posts';
import Button from '../../components/Button';
import { Input } from '../../components/Input /input';

class App extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 5,
    searchValue: ''
  };

  async componentDidMount() {
    await this.getPosts();
  }
  
  
  getPosts = async() => {

    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState(
      { posts: postsAndPhotos.slice(page, postsPerPage),
        allPosts: postsAndPhotos
      });
  } 

  loadMorePosts = () => {
    const {
      posts,
      allPosts,
      page,
      postsPerPage
    } = this.state;

    if(allPosts.length === posts.length) {
      this.setState({disabled: true});
    } else {
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
      posts.push(...nextPosts);
  
      this.setState({posts, page: nextPage});
    }
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value});
  }

  render() {
    const {posts, page, postsPerPage, allPosts, searchValue} = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length;
    
    const filteredPosts =!!searchValue ? 
      posts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLocaleLowerCase()) || post.body.toLocaleLowerCase().includes(
            searchValue.toLocaleLowerCase()
          );
      }) 
    : posts;
    return(
      <section className="container">
        {!!searchValue && (
        <>
        <h1>Search Value: {searchValue}</h1><br /><br/>
        </>
      )}
        <Input handleChange={this.handleChange} value={searchValue}/>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}
        {filteredPosts.length === 0 && (
          <p>Nenhum post encontrado</p>
        )}
        <div className="btn-center">
          {!searchValue && (
            <Button label='Carregar mais posts' onClick={this.loadMorePosts} disabled={noMorePosts}/>
          )}
        </div>
      </section>
    );
  }
}
export default App;
