import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.css'
import { Container } from '@mui/material'
import { RouterProvider as Router } from 'react-router-dom'
import routers from './routers'
import './firebase'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Container sx={{width: '100%', height: 'auto'}}>
        <Router router={routers}></Router>
      </Container>
  </React.StrictMode>,
)
