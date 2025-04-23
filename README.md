 GCP Data Engineer Quiz App

![Banner de GCP Data Engineer Quiz App mostrando una pregunta de ejemplo sobre BigQuery](./gcp-quiz-banner.png)

Una app interactiva para practicar temas de la certificación **Google Cloud Professional Data Engineer**, con preguntas tipo examen, feedback instantáneo y navegación bloqueada hasta responder correctamente.

---

## ¿Qué hace?

- Presenta preguntas de opción múltiple.  
- Da retroalimentación inmediata con explicación.  
- Impide avanzar hasta responder correctamente.  
- Muestra puntaje final.  
- Está pensada para ampliarse por temas (BigQuery, Dataflow, IAM, etc.).

---

## ¿Cómo ejecutarla localmente?

```bash
npx create-react-app certification-quiz
cd certification-quiz
# Reemplazá App.js con tu archivo personalizado
npm start


---

¿Cómo desplegarla?

1. Subí tu proyecto a GitHub.


2. Entrá a vercel.com, logueate con GitHub.


3. Seleccioná tu repo y ¡listo! Tenés la app online.




---

¿Cómo usar quizData.json?

La app puede cargar dinámicamente preguntas desde un archivo externo.
Subí un archivo quizData.json en la raíz del proyecto y usá un fetch() para cargarlo:

useEffect(() => {
  fetch('/quizData.json')
    .then(res => res.json())
    .then(data => setPreguntas(data));
}, []);


---

Revisión técnica por IA compañera

Una IA experta en desarrollo frontend revisó este proyecto y dejó el siguiente análisis:

✔ useState bien aplicado.

✔ Lógica clara y fluida.

✔ Modularidad de preguntas escalable.

✔ UX adaptativa, con feedback inmediato.

✔ Tailwind CSS aplicado (requiere instalación previa).

✔ Flujo controlado: no se avanza sin acertar.


> “Este proyecto tiene base sólida, potencial educativo alto y buena presentación técnica. Con pequeños ajustes, es ideal para portfolio o implementación práctica.”




---

Créditos

Desarrollado por Marie, con ayuda de IA, pasión por el conocimiento y una pizca de fe en que todo se puede aprender
