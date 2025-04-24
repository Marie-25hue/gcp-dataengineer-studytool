import React, { useState, useEffect } from 'react';
import questions from '../data/questions.json';

export default function ExamMode() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7200); // 120 minutos en segundos

  // Temporizador
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSelect = (opt) => {
    setSelected(opt);
  };

  const next = () => {
    if (selected === questions[current].answer) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 === questions.length) {
      finishExam();
      return;
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
  };

  const volverAlMenu = () => {
    window.location.href = '/';
  };

  const finishExam = () => {
    // alert(`Examen finalizado.\nTu puntaje es ${score} de ${questions.length}`);
    window.location.reload();
  };

  return (
    <div className="quiz-card fade-in" key={current}>
      <div style={{ textAlign: 'right', fontWeight: 'bold', color: '#444' }}>
        Tiempo restante: {formatTime(timeLeft)}
      </div>

      <h2>📝 Modo Examen</h2>
      <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1rem' }}>
        Responde sin pistas. Al final verás tu puntaje. ¡Buena suerte!
      </p>

      <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#555' }}>
        Pregunta {current + 1} de {questions.length}
      </p>

      <p style={{ fontWeight: 'bold' }}>{questions[current].question}</p>

      {/* Opciones de respuesta */}
      <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {questions[current].options.map((opt, index) => (
          <button
            key={index}
            onClick={() => handleSelect(opt)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selected === opt ? '#cce5ff' : '#00bcd4',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              minWidth: '200px',
              transition: 'background-color 0.3s',
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Botones de navegación */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button
          onClick={next}
          disabled={!selected}
          style={{
            padding: '0.6rem 1.5rem',
            backgroundColor: selected ? '#4caf50' : '#a5d6a7',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: selected ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s',
          }}
        >
          Siguiente
        </button>

        <button
          onClick={volverAlMenu}
          style={{
            padding: '0.6rem 1.5rem',
            backgroundColor: '#9e9e9e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
        >
          Volver
        </button>
      </div>
    </div>
  );
}
