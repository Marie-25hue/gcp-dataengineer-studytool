import React, { useState, useEffect } from 'react';
import questions from '../data/questions.json';

export default function ExamMode() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (timeLeft === 0) handleNext();
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelect = (opt) => setSelected(opt);

  const handleNext = () => {
    const correct = selected === questions[current].answer;
    setResults([...results, { question: questions[current].question, selected, correct }]);
    if (correct) setScore(score + 1);
    setSelected(null);
    setTimeLeft(60);
    setCurrent((prev) => prev + 1);
  };

  if (current >= questions.length) {
    return (
      <div>
        <h2>📝 Examen Finalizado</h2>
        <p>Tu puntuación: {score}/{questions.length}</p>
        <ul>
          {results.map((r, i) => (
            <li key={i}>{r.question} - {r.correct ? '✅' : '❌'} (Elegiste: {r.selected})</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>📝 Modo Examen</h2>
      <p>⏱ Tiempo restante: {timeLeft}s</p>
      <p>{questions[current].question}</p>
      {questions[current].options.map((opt, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              name="option"
              value={opt}
              checked={selected === opt}
              onChange={() => handleSelect(opt)}
            />
            {opt}
          </label>
        </div>
      ))}
      <button onClick={handleNext} disabled={selected === null}>
        Siguiente
      </button>
    </div>
  );
        }
