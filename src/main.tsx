import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecipeProvider } from './contexts/RecipeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecipeProvider>
    <App />
    </RecipeProvider>
  </React.StrictMode>,
)
