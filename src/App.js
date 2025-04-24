// src/App.js import React, { useState } from 'react'; import StudyMode from './components/StudyMode'; import ExamMode from './components/ExamMode';

export default function App() { const [mode, setMode] = useState(null); const [lang, setLang] = useState('es');

const t = { es: { title: 'GCP Certification Quiz App', choose: 'Elige un modo para comenzar:', study: '🧠 Modo Estudio', exam: '📝 Modo Examen', back: '⬅ Volver', language: 'Idioma' }, en: { title: 'GCP Certification Quiz App', choose: 'Choose a mode to begin:', study: '🧠 Study Mode', exam: '📝 Exam Mode', back: '⬅ Back', language: 'Language' } };

return ( <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}> <h1>{t[lang].title}</h1>

<div style={{ marginBottom: '1rem' }}>
    <label>{t[lang].language}:</label>
    <select value={lang} onChange={(e) => setLang(e.target.value)}>
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  </div>

  {!mode && (
    <div>
      <p>{t[lang].choose}</p>
      <button onClick={() => setMode('study')}>{t[lang].study}</button>
      <button onClick={() => setMode('exam')}>{t[lang].exam}</button>
    </div>
  )}

  {mode === 'study' && (
    <>
      <StudyMode />
      <button onClick={() => setMode(null)}>{t[lang].back}</button>
    </>
  )}

  {mode === 'exam' && (
    <>
      <ExamMode />
      <button onClick={() => setMode(null)}>{t[lang].back}</button>
    </>
  )}
</div>

); }
