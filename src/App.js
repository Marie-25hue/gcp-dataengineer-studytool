import React, { useEffect, useState } from 'react';

export default function QuizApp() {
  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [puntaje, setPuntaje] = useState(0);

  useEffect(() => {
    fetch('/quizData.json')
      .then(res => res.json())
      .then(data => setPreguntas(data));
  }, []);

  if (!preguntas.length) return <p className="p-4">Cargando preguntas...</p>;

  const preguntaActual = preguntas[indiceActual];

  const handleRespuesta = (opcion) => {
    setRespuestaSeleccionada(opcion);
    const esCorrecta = opcion === preguntaActual.respuestaCorrecta;
    setRespuestaCorrecta(esCorrecta);
    if (esCorrecta) setPuntaje(p => p + 1);
  };

  const siguientePregunta = () => {
    setRespuestaSeleccionada(null);
    setRespuestaCorrecta(false);
    setIndiceActual(indiceActual + 1);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz GCP Data Engineer</h1>
      {indiceActual < preguntas.length ? (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{preguntaActual.pregunta}</h2>
          <div className="space-y-2">
            {preguntaActual.opciones.map((opcion) => (
              <button
                key={opcion}
                onClick={() => handleRespuesta(opcion)}
                className={\`w-full text-left p-2 rounded border \${respuestaSeleccionada === opcion ? (respuestaCorrecta ? 'border-green-500' : 'border-red-500') : 'border-gray-300'}\`}
              >
                {opcion}
              </button>
            ))}
          </div>
          {respuestaSeleccionada && (
            <div className="mt-4">
              <p className={\`font-medium \${respuestaCorrecta ? 'text-green-600' : 'text-red-600'}\`}>
                {respuestaCorrecta ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className="text-sm text-gray-700 mt-1">{preguntaActual.explicacion}</p>
              {respuestaCorrecta && (
                <button
                  onClick={siguientePregunta}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Siguiente
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center mt-8">
          <h2 className="text-xl font-bold text-green-700">¡Quiz completado!</h2>
          <p className="mt-2 text-gray-700">Puntaje final: {puntaje} / {preguntas.length}</p>
        </div>
      )}
    </div>
  );
}