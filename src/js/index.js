// Import our custom CSS
import '../sass/main.scss'

// Import components
import './components/index'

import './layout/header'
import './layout/footer'

import Dashboard from './pages/listStory'
import './pages/companyProfile'
import Add from './story/addStory'

import Login from './pages/auth/login'
import Register from './pages/auth/register'

import './components/locale-picker'

const routes = {
  '/': Dashboard,
  '/story/addStory.html': Add,

  '/auth/login.html': Login,
  '/auth/register.html': Register
}

const detectRoute = () => routes[window.location.pathname]

window.addEventListener('DOMContentLoaded', async () => {
  const route = detectRoute()
  route.init()
})
