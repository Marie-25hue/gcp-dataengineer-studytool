import React, { useState } from 'react'; import questions from '../data/questions.json';

export default function StudyMode() { const [current, setCurrent] = useState(0); const [selected, setSelected] = useState(null); const [showAnswer, setShowAnswer] = useState(false);

const handleSelect = (option) => { setSelected(option); setShowAnswer(true); };

const next = () => { if (current < questions.length - 1) { setCurrent(current + 1); setSelected(null); setShowAnswer(false); } };

return ( <div className="quiz-card fade-in" key={current}> <h2>🧠 Modo Estudio</h2> <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1rem' }}> Estudiá con calma. Recibís la respuesta y explicación después de responder. </p>

<p style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#555' }}>
    Pregunta {current + 1} de {questions.length}
  </p>

  <p style={{ fontWeight: 'bold' }}>{questions[current].question}</p>

  <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
    {questions[current].options.map((opt, index) => (
      <button
        key={index}
        onClick={() => handleSelect(opt)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: showAnswer
            ? opt === questions[current].answer
              ? '#388e3c'
              : opt === selected
                ? '#f44336'
                : '#00bcd4'
            : '#00bcd4',
          border: 'none',
          color: '#fff',
          borderRadius: '8px',
          cursor: 'pointer',
          minWidth: '200px',
          transition: 'all 0.3s ease'
        }}
        disabled={showAnswer}
      >
        {opt}
      </button>
    ))}
  </div>

  {showAnswer && (
    <div style={{ marginTop: '1rem', fontStyle: 'italic', color: '#444', maxWidth: '600px', textAlign: 'center' }}>
      <p>
        <strong>Respuesta correcta:</strong> {questions[current].answer}
      </p>
      <p>
        <strong>Explicación:</strong> {questions[current].explanation || 'Sin explicación disponible.'}
      </p>
    </div>
  )}

  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
    <button
      onClick={next}
      disabled={!showAnswer || current === questions.length - 1}
      style={{
        padding: '0.6rem 1.5rem',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: showAnswer ? 'pointer' : 'not-allowed'
      }}
    >
      Siguiente
    </button>
  </div>

  {current === questions.length - 1 && showAnswer && (
    <div style={{ marginTop: '2rem', textAlign: 'center', fontWeight: 'bold', color: '#2e7d32' }}>
      ¡Has terminado el modo estudio!
    </div>
  )}
</div>

); }
