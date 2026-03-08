import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Calendar } from './index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Calendar themeName='seasonal' />
  </StrictMode>
);
