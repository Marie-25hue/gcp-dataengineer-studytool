import React, { useState } from 'react';
import questions from '../data/questions.json';

export default function StudyMode() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
 
  const handleSelect = (option) => {
    setSelected(option);
    setShowAnswer(true);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % questions.length);
    setSelected(null);
    setShowAnswer(false);
  };

  return (
    <div>
      <h2>🧠 Modo Estudio</h2>
      <p>{questions[current].question}</p>
      {questions[current].options.map((opt) => (
        <button
          key={opt}
          onClick={() => handleSelect(opt)}
          style={{
            margin: '0.5rem',
            backgroundColor:
              showAnswer && opt === questions[current].answer ? 'lightgreen' : ''
          }}
        >
          {opt}
        </button>
      ))}
      {showAnswer && <p>✅ Respuesta correcta: {questions[current].answer}</p>}
      <button onClick={next}>Siguiente</button>
    </div>
  );
}
