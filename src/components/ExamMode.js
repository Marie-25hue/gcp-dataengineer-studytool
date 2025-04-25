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
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(timer);
        finishExam(true);
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(timer); // limpia si el componente se desmonta
}, []); // OJO: los corchetes vacíos son clave para que corra una sola vez

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

   const finishExam = (fromTimer = false) => {
   const mensaje = fromTimer
    ? 'Se agotó el tiempo.'
    : '¡Terminaste el examen!';

   setTimeout(() => {
    alert(`${mensaje}\nTu puntaje es ${score} de ${questions.length}`);
    window.location.reload();
   }, 300);
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
          Siguiente
        </button>
      </>
    ) : (
      <div style={{ marginTop: '2rem' }}>
        <h3>Examen finalizado</h3>
        <p>Tu puntaje es {score} de {questions.length}</p>
      </div>
    )}

    {/* Solo UN botón Volver */}
    <div style={{ marginTop: '2rem' }}>
      <button onClick={() => window.location.href = '/'} className="btn-return">
        Volver
      </button>
    </div>
  </div>
);
