import React, { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from 'axios'


export default function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(10)
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await axios.get("http://jsonplaceholder.typicode.com/posts")
        setPosts(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    fetchPosts()
  },[])

//展示的post get current posts ，post是个array
  const indexOfLastPost = currentPage * postPerPage;  //2*10
  const indexOfFirstPost = indexOfLastPost - postPerPage  
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
//CHANGE PAGE
  const paginate = (currentNumber) => setCurrentPage(currentNumber)

  return (
  <div className="container mt-5">
    <h1 className="text-primary mb-3">My Blog</h1>
    <Posts currentPosts = {currentPosts} loading = {loading}/>
    <Pagination postsLength= {posts.length} postPerPage= {postPerPage} 
    paginate={paginate}
    />
  </div>
  ) ;
}