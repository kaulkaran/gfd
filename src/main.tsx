import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import AppLayout from './components/AppLayout';
import AuthWrapper from './components/AuthWrapper';
import HomePage from './pages/HomePage';
import LettersPage from './pages/LettersPage';
import LetterDetailPage from './pages/LetterDetailPage';
import WriteLetterPage from './pages/WriteLetterPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/letters" element={<LettersPage />} />
            <Route path="/letters/:id" element={<LetterDetailPage />} />
            <Route path="/write" element={<WriteLetterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
      </AuthWrapper>
    </BrowserRouter>
  </StrictMode>
);