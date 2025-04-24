import React, { useState } from 'react';
import questions from '../data/questions.json';

export default function ExamMode() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (opt) => {
    setSelected(opt);
    setShowAnswer(true);
    if (opt === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const next = () => {
    if (current + 1 === questions.length) {
      alert('Tu puntaje final es ' + score + ' de ' + questions.length);
      window.location.reload();
      return;
    }
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setShowAnswer(false);
  };

  const volverAlMenu = () => {
    window.location.href = '/';
  };

  return (
    <div className="quiz-card fade-in" key={current}>
      <h2>📝 Modo Examen</h2>
      <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1rem' }}>
        Este es el modo examen. Respondé sin pistas. Al final verás tu puntaje. ¡Buena suerte!
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

      {showAnswer && (
        <button onClick={next} className="btn-next" style={{ marginTop: '1rem' }}>
          Siguiente
        </button>
      )}

      <div style={{ marginTop: '2rem' }}>
        <button onClick={volverAlMenu} className="btn-return">
          Volver
        </button>
      </div>
    </div>
  );
}
