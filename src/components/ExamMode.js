import React, { useState, useEffect } from 'react';
import questions from '../data/questions.json';

export default function ExamMode() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7200); // 120 minutos
  const [examFinished, setExamFinished] = useState(false);

  // Temporizador
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          finishExam(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const finishExam = () => {
    setExamFinished(true);
  };

  const volverAlMenu = () => {
    window.location.href = '/';
  };

  const resetExam = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(7200);
    setExamFinished(false);
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

      {!examFinished ? (
        <>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#555' }}>
            Pregunta {current + 1} de {questions.length}
          </p>

          <p style={{ fontWeight: 'bold' }}>{questions[current].question}</p>

          {questions[current].options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              style={{
                margin: '0.5rem',
                backgroundColor: selected === opt ? '#cce5ff' : '',
              }}
            >
              {opt}
            </button>
          ))}

          <button
            onClick={() => {
              if (selected === questions[current].answer) {
                setScore((prev) => prev + 1);
              }
              if (current + 1 === questions.length) {
                finishExam();
              } else {
                setCurrent((prev) => prev + 1);
                setSelected(null);
              }
            }}
            className="btn-next"
            style={{ marginTop: '1rem' }}
            disabled={!selected}
          >
            {current + 1 === questions.length ? 'Finalizar' : 'Siguiente'}
          </button>
        </>
      ) : (
        <>
          <div style={{ marginTop: '2rem' }}>
            <h3>¡Examen completado!</h3>
            <p>Tu puntaje: {score} de {questions.length}</p>
            <button onClick={resetExam} style={{ marginRight: '1rem' }}>
              Volver a intentar
            </button>
            <button onClick={volverAlMenu}>
              Volver al menú
            </button>
          </div>
        </>
      )}
    </div>
  );
}
