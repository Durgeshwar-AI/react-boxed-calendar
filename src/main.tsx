import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Calendar from './Calendar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Calendar />
  </StrictMode>
);
