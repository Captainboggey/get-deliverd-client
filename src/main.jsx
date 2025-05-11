import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Route.jsx'
import { HelmetProvider } from 'react-helmet-async'
const helmetContext = {};
createRoot(document.getElementById('root')).render(
  <StrictMode> 
  <div   className='font-main '>
    <HelmetProvider context={helmetContext}>
 <RouterProvider router={router}></RouterProvider>
    </HelmetProvider>
   
  </div>
  </StrictMode>,
)
