import axios from 'axios';

const API_KEY = 'AIzaSyAsYnprqHafTwJbq8J2QbsbiK1FyR93spk';

// Helper function to clean text
const cleanText = (text) => {
  return text
    .replace(/[*_~]+/g, '')               // remove *, _, ~
    .replace(/\u200B/g, '')               // remove zero-width space
    .replace(/[^\x00-\x7F]+/g, '')        // remove non-ASCII characters
    .replace(/\r?\n[\s\r\n]*/g, '\n')     // normalize line breaks
    .trim();
};

// Function to fetch questions based on skill
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

// Function to analyze answers with feedback, grammar check, and scoring
export const analyzeAnswers = async (answers) => {
  const formatted = answers
    .map((ans, i) => `Q${i + 1}: ${ans.question}\nA${i + 1}: ${ans.answer}`)
    .join('\n\n');
  
  // Send answers to Gemini for analysis
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      contents: [{
        parts: [{
          text: `Analyze the following theoretical answers and provide feedback. Include grammar mistakes, programming understanding, and score.\n\n${formatted}`
        }]
      }]
    },
    { headers: { 'Content-Type': 'application/json' } }
  );

  const analysisText = cleanText(response.data.candidates[0]?.content?.parts[0]?.text || "No analysis available.");

  // Now add more checks (for grammar, programming, and score)
  const analysis = await performAdditionalAnalysis(analysisText);

  return analysis;
};

// Additional analysis for grammar mistakes, understanding, and scoring
const performAdditionalAnalysis = async (analysisText) => {
  const grammarMistakes = analyzeGrammarMistakes(analysisText);
  
  const programmingUnderstandingScore = assessProgrammingUnderstanding(analysisText);
  
  const totalScore = calculateScore(grammarMistakes, programmingUnderstandingScore);

  return {
    analysisText,
    grammarMistakes,
    programmingUnderstandingScore,
    totalScore
  };
};

const analyzeGrammarMistakes = (text) => {
  const grammarIndicators = ['grammar', 'mistake', 'error', 'incorrect'];
  const mistakesFound = grammarIndicators.filter(indicator => text.toLowerCase().includes(indicator));
  return mistakesFound.length;
};

const assessProgrammingUnderstanding = (text) => {
  const programmingKeywords = ['algorithm', 'data structure', 'complexity', 'syntax', 'logic'];
  const foundKeywords = programmingKeywords.filter(keyword => text.toLowerCase().includes(keyword));
  return foundKeywords.length;
};

const calculateScore = (grammarMistakes, programmingUnderstandingScore) => {
  const grammarPenalty = grammarMistakes * 0.5;
  const understandingScore = programmingUnderstandingScore * 1;
  const totalScore = Math.max(0, 10 - grammarPenalty + understandingScore); 
  return totalScore.toFixed(2);
};
