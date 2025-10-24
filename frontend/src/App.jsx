import { Outlet } from 'react-router-dom'
import RecipeProvider from './context-providers/RecipeProvider'
import NavBar from './components/NavBar'
import './App.css'

function App() {
 

  return (
    <>
    <RecipeProvider>
      <header>
       <NavBar />
      </header>
      <main>
      <Outlet />
        </main>
    </RecipeProvider>
    </>
  )
}

export default App
