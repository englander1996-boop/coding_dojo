import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import LevelPage from './pages/LevelPage'
import ProblemPage from './pages/ProblemPage'
import SelfCheck from './pages/SelfCheck'
import Coverage from './pages/Coverage'
import Prereq from './pages/Prereq'
import Achievements from './pages/Achievements'

// HashRouter keeps deep links working on static hosts with no server config.
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'level/:level', element: <LevelPage /> },
      { path: 'problem/:id', element: <ProblemPage /> },
      { path: 'achievements', element: <Achievements /> },
      { path: 'self-check', element: <SelfCheck /> },
      { path: 'coverage', element: <Coverage /> },
      { path: 'prereq', element: <Prereq /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
