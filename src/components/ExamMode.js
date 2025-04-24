import React, { useEffect, useState } from 'react';

export default function ExamMode() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetch('/questions.json')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error loading questions:', err));
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const next = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) return <p>Cargando examen...</p>;

  if (finished) {
    return (
      <div>
        <h2>Resultado del Examen</h2>
        <p>Obtuviste {score} de {questions.length} respuestas correctas.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>📝 Modo Examen</h2>
      <p>{questions[current].question}</p>
      {questions[current].options.map((opt) => (
        <button
          key={opt}
          onClick={() => handleSelect(opt)}
          style={{
            margin: '0.5rem',
            backgroundColor:
              selected === opt ? '#cceeff' : ''
          }}
        >
          {opt}
        </button>
      ))}
      <button onClick={next} disabled={!selected}>Siguiente</button>
    </div>
  );
            }
