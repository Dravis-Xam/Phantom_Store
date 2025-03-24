import './App.css'
import Body from './frontend/body/Body'
import CheckApp from './frontend/body/CheckApp'
import Footer from './frontend/footer/Footer'
import Header from './frontend/header/Header'
import Login_signup_form from './frontend/loginorsignup/loginorsignup'
import CheckAppProvider from './CheckAppContext'

function App() {
  return (
    <>
      <CheckAppProvider>
        <Header />
        {/*<CheckApp />*/}
        <Login_signup_form />
        <Body />
        <Footer />
      </CheckAppProvider>
    </>
  )
}

export default App
