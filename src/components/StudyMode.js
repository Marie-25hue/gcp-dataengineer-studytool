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
      <button onClick={next}>Siguiente</button>
    </div>
  );
}
