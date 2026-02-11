import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Calendar from './Calendar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="p-10 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Calendar Themes</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Cyberpunk Theme</h2>
        <Calendar themeName="cyberpunk" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Retro Theme</h2>
        <Calendar themeName="retro" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Nature Theme</h2>
        <Calendar themeName="nature" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Metallic Theme (Existing)</h2>
        <Calendar themeName="metallic" />
      </section>
    </div>
  </StrictMode>,
)
