// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App.tsx';
import CaseDetail from './pages/CaseDetail.tsx'; // ← NEW
import Contact from "./pages/Contact.jsx";
import './index.css';

const navCards = [
  {
    label: 'Services',
    bgColor: '#111827',
    textColor: '#ffffff',
    links: [
      { label: 'AI Voice & Text Agents', href: '/service/ai-agents' },
      { label: 'CRM Optimization', href: '/service/crm-optimization' },
      { label: 'Ops Automation', href: '/service/ops-automation' },
    ],
  },
  {
    label: 'Company',
    bgColor: '#0b1220',
    textColor: '#e5e7eb',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Security', href: '/#security' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    label: 'Resources',
    bgColor: '#0a0f1a',
    textColor: '#e5e7eb',
    links: [
      { label: 'Case Studies', href: '/#proven' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Blog', href: '/blog' },
    ],
  },
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/case/:slug" element={<CaseDetail />} /> {/* ← NEW */}
      </Routes>
    </Router>
  </StrictMode>
);
