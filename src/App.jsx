import './App.css'
import Body from './frontend/body/Body'
import CheckApp from './frontend/body/CheckApp'
import Footer from './frontend/footer/Footer'
import Header from './frontend/header/Header'
import Login_signup_form from './frontend/loginorsignup/loginorsignup'
import CheckAppProvider from './CheckAppContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={ <Login_signup_form /> } />
          <Route path='/' element = {
            <CheckAppProvider>
              <Header />
              <CheckApp />
              <Body />
              <Footer />
            </CheckAppProvider>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
