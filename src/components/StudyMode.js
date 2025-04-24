import React, { useEffect, useState } from 'react';

export default function StudyMode() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error('Error loading questions:', err));
  }, []);

  if (questions.length === 0) return <p>Cargando preguntas...</p>;

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
    <div className="quiz-card">
      <h2>🧠 Modo Estudio</h2>
      <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1rem' }}>
  Bienvenida al modo estudio. Elegí una opción y descubrí cuál es la respuesta correcta. ¡Sin presión, solo para aprender!
</p>
    <div className="progress-container">
  <div
    className="progress-bar"
   style={{
  width: `${((current + 1) / questions.length) * 100}%`
}}
data-progress={`${Math.round(((current + 1) / questions.length) * 100)}%`}
  ></div>
</div>
      <p>{questions[current].question}</p>
      {questions[current].options.map((opt) => {
        let style = {};

        if (showAnswer) {
          if (opt === questions[current].answer) {
            style.backgroundColor = 'lightgreen';
          } else if (opt === selected) {
            style.backgroundColor = '#ffb3b3'; // rojo clarito
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
      <button onClick={next} className="btn-next" disabled={!showAnswer}>
        Siguiente
      </button>
    </div>
  );
        }
