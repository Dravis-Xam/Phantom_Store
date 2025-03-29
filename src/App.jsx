import './App.css'
import Body from './frontend/body/Body'
import CheckApp from './frontend/body/CheckApp'
import Footer from './frontend/footer/Footer'
import Header from './frontend/header/Header'
import CheckAppProvider from './CheckAppContext'

function App() {
  return (
    <>
      <CheckAppProvider>
        <Header />
        <Body />
        <Footer />
      </CheckAppProvider>
    </>
  )
}

export default App
