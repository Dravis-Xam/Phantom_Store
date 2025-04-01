import './App.css';
import Body from './frontend/body/Body';
import CheckApp from './frontend/body/CheckApp';
import Footer from './frontend/footer/Footer';
import Header from './frontend/header/Header';
import Login_signup_form from './frontend/loginorsignup/loginorsignup';
import CheckAppProvider from './CheckAppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Downloads, Recents, Settings, Rewards } from './frontend/nav/Sections.jsx';

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CheckAppProvider>
        <Routes>
          <Route path="/login" element={<Login_signup_form />} />
          <Route path="/" element={
            <MainLayout>
              <CheckApp />
              <Body />
            </MainLayout>
          } />
          <Route path="/downloads" element={
            <MainLayout>
              <Downloads />
            </MainLayout>
          } />
          <Route path="/recents" element={
            <MainLayout>
              <Recents />
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <Settings />
            </MainLayout>
          } />
          <Route path="/rewards" element={
            <MainLayout>
              <Rewards />
            </MainLayout>
          } />
        </Routes>
      </CheckAppProvider>
    </BrowserRouter>
  );
}

export default App;