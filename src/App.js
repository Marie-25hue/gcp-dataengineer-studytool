// src/App.js import React, { useState } from 'react'; import StudyMode from './components/StudyMode'; import ExamMode from './components/ExamMode';

export default function App() { const [mode, setMode] = useState(null); const [lang, setLang] = useState('es');

const t = { es: { title: 'GCP Certification Quiz App', choose: 'Elige un modo para comenzar:', study: '🧠 Modo Estudio', exam: '📝 Modo Examen', back: '⬅ Volver', language: 'Idioma' }, en: { title: 'GCP Certification Quiz App', choose: 'Choose a mode to begin:', study: '🧠 Study Mode', exam: '📝 Exam Mode', back: '⬅ Back', language: 'Language' } };

return (
  <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
    <h1>¡Hola Marie!</h1>
    <p>Tu app se está desplegando correctamente.</p>
    <p>Ahora vamos a reactivar los componentes paso a paso.</p>
  </div>
); }
