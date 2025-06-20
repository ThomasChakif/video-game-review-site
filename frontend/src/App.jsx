import react from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Game from './pages/Game'
import UserPage from './pages/UserPage'
import Help from './pages/Help'

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/game/:gameID'
            element = {
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
          <Route
            path='/help'
            element = {
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />
          <Route
           path='/userpage'
           element = {
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
           }
          />
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<NotFound />}/> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
