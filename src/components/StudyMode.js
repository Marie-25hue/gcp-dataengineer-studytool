import React, { useState } from 'react';
import questions from '../data/questions.json';

export default function StudyMode() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (opt) => {
    setSelected(opt);
    setShowAnswer(true);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % questions.length);
    setSelected(null);
    setShowAnswer(false);
  };

  const volverAlMenu = () => {
    window.location.href = '/';
  };

  return (
    <div className="quiz-card fade-in" key={current}>
      <h2>🧠 Modo Estudio</h2>
      <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1rem' }}>
        Bienvenida al modo estudio. Elegí una opción y descubrí cuál es la respuesta correcta.
        ¡Sin presión, solo para aprender!
      </p>

      <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#555' }}>
        Pregunta {current + 1} de {questions.length}
      </p>

      <p style={{ fontWeight: 'bold' }}>{questions[current].question}</p>

      {questions[current].options.map((opt) => {
        let style = {};
        if (showAnswer) {
          if (opt === questions[current].answer) {
            style.backgroundColor = 'lightgreen';
          } else if (opt === selected) {
            style.backgroundColor = '#ffb3b3';
          }
        }
        return (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            style={{ ...style, margin: '0.5rem' }}
          >
            {opt}
          </button>
        );
      })}

      {showAnswer && (
        <div style={{ fontSize: '2rem', marginTop: '1rem' }}>
          {selected === questions[current].answer ? '✅ ¡Correcto!' : '❌ Ups, no era esa'}
        </div>
      )}

      <button onClick={next} style={{ marginTop: '1rem' }}>
        Siguiente
      </button>

      <button onClick={volverAlMenu} style={{ marginTop: '1rem' }}>
        Volver
      </button>
    </div>
  );
}
