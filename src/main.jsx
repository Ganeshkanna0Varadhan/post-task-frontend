import { StrictMode } from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>
)
