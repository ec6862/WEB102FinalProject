import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './routes/Layout.jsx'
import CreatePost from './routes/CreatePost.jsx'
import HomePage from './routes/HomePage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Layout/>}>
        <Route index ={true} element={<HomePage/>}/> {/* Remember to put element = "home page" */}
        <Route path = "/createPost" element={<CreatePost/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
