import React, { useEffect, useState } from 'react';

export default function ExamMode() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetch('/questions.json')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error loading questions:', err));
  }, []);

  if (questions.length === 0) return <p>Cargando examen...</p>;

  const handleSelect = (option) => {
    setSelected(option);
    setShowAnswer(true);
    if (option === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const next = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

 if (finished) {
  return (
    <div className="quiz-card">
      <h2>Resultado del Examen</h2>
      <p>Obtuviste {score} de {questions.length} respuestas correctas.</p>
      <button
        onClick={() => {
          setCurrent(0);
          setSelected(null);
          setScore(0);
          setShowAnswer(false);
          setFinished(false);
        }}
        className="btn-next"
        style={{ marginTop: '1rem' }}
      >
        Volver a empezar
      </button>
    </div>
  );
}

  return (
    <div className="quiz-card">
      <h2>📝 Modo Examen</h2>
      <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1rem' }}>
  Este es el modo examen. Responde sin pistas. Al final verás tu puntaje. ¡Buena suerte!
   </p>
    <div className="progress-container">
  <div
    className="progress-bar"
    style={{
  width: ${((current + 1) / questions.length) * 100}%
}}
  ></div>
</div>
      <p>{questions[current].question}</p>
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
            className="btn-answer"
            style={style}
            disabled={showAnswer}
          >
            {opt}
          </button>
        );
      })}
      <br />
      <button
        onClick={next}
        className="btn-next"
        disabled={!showAnswer}
      >
        Siguiente
      </button>
    </div>
  );
              }
