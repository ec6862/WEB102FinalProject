import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Layout from './routes/Layout.jsx'
import CreatePost from './routes/CreatePost.jsx'
import HomePage from './routes/HomePage.jsx'
import PostDetails from './components/PostDetails.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Layout/>}>
          <Route index ={true} element={<HomePage/>}/> {/* Remember to put element = "home page" */}
          <Route path = "/createPost" element={<CreatePost/>}/>
          <Route path = "/createPost/:symbol" element={<PostDetails/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
