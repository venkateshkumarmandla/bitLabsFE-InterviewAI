import axios from 'axios';

const API_KEY = 'AIzaSyAsYnprqHafTwJbq8J2QbsbiK1FyR93spk';

export const fetchQuestionsFromGemini = async (skill) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate 3 theoretical interview questions related to ${skill}. Each question should have:
            - A theoretical question (no code).
            - A detailed explanation as the answer.

            Format:
            Q1: What is [skill]?
            Answer: [Provide a detailed theoretical explanation of the concept.]

            Make the questions focused on theoretical concepts of the given skill.`
          }]
        }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Parse the JSON string inside the response
    const resultText = response.data.candidates[0].content.parts[0].text;
    const questions = resultText.split('\n').filter(line => line.startsWith('Q'));

    // Structure the questions and return them
    const formattedQuestions = questions.map((question) => {
      const parts = question.split('Answer:');
      const questionText = parts[0].replace('Q:', '').trim();
      const answerText = parts[1]?.trim();

      return {
        question: questionText,
        answer: answerText
      };
    });

    return formattedQuestions;
  } catch (error) {
    console.error('Error fetching theoretical questions:', error);
    throw error;
  }
};
const cleanText = (text) => {
    return text
      .replace(/[*_~]+/g, '')               // remove *, _, ~
      .replace(/\u200B/g, '')               // remove zero-width space
      .replace(/[^\x00-\x7F]+/g, '')        // remove non-ASCII characters
      .replace(/\r?\n[\s\r\n]*/g, '\n')     // normalize line breaks
      .trim();
  };

export const analyzeAnswers = async (answers) => {
    const formatted = answers
      .map((ans, i) => `Q${i + 1}: ${ans.question}\nA${i + 1}: ${ans.answer}`)
      .join('\n\n');
  
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Analyze the following theoretical answers and provide feedback.\n\n${formatted}`
          }]
        }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    return cleanText(response.data.candidates[0]?.content?.parts[0]?.text || "No analysis available.");
  };
  
