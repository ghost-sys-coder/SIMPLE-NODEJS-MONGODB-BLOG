import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, AboutPage, ArticleListPage, ArticlePage, NotFoundPage, LoginPage, CreateAccount } from './pages/index';
import { Navbar } from './components/index';

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <div id="page-body">
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/articles' element={<ArticleListPage />} />
            <Route path='/articles/:articleId' element={<ArticlePage />} />
            <Route path='/createaccount' element={<CreateAccount />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes> 
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
