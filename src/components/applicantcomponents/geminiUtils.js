// import axios from 'axios';

// const API_KEY = 'AIzaSyAsYnprqHafTwJbq8J2QbsbiK1FyR93spk';

// export const fetchQuestionsFromGemini = async (skill) => {
//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//       {
//         contents: [{
//           parts: [{
//             text: `Generate 3 theoretical interview questions related to ${skill}. Each question should have:
//             - A theoretical question (no code).
//             - A detailed explanation as the answer.

//             Format:
//             Q1: What is [skill]?
//             Answer: [Provide a detailed theoretical explanation of the concept.]

//             Make the questions focused on theoretical concepts of the given skill.`
//           }]
//         }]
//       },
//       { headers: { 'Content-Type': 'application/json' } }
//     );

//     // Parse the JSON string inside the response
//     const resultText = response.data.candidates[0].content.parts[0].text;
//     const questions = resultText.split('\n').filter(line => line.startsWith('Q'));

//     // Structure the questions and return them
//     const formattedQuestions = questions.map((question) => {
//       const parts = question.split('Answer:');
//       const questionText = parts[0].replace('Q:', '').trim();
//       const answerText = parts[1]?.trim();

//       return {
//         question: questionText,
//         answer: answerText
//       };
//     });

//     return formattedQuestions;
//   } catch (error) {
//     console.error('Error fetching theoretical questions:', error);
//     throw error;
//   }
// };
// const cleanText = (text) => {
//     return text
//       .replace(/[*_~]+/g, '')               // remove *, _, ~
//       .replace(/\u200B/g, '')               // remove zero-width space
//       .replace(/[^\x00-\x7F]+/g, '')        // remove non-ASCII characters
//       .replace(/\r?\n[\s\r\n]*/g, '\n')     // normalize line breaks
//       .trim();
//   };

// export const analyzeAnswers = async (answers) => {
//     const formatted = answers
//       .map((ans, i) => `Q${i + 1}: ${ans.question}\nA${i + 1}: ${ans.answer}`)
//       .join('\n\n');
  
//     const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//       {
//         contents: [{
//           parts: [{
//             text: `Analyze the following theoretical answers and provide feedback.\n\n${formatted}`
//           }]
//         }]
//       },
//       { headers: { 'Content-Type': 'application/json' } }
//     );
  
//     return cleanText(response.data.candidates[0]?.content?.parts[0]?.text || "No analysis available.");
//   };
  



//   // Grammar analysis
// export const analyzeGrammarMistakes = (text) => {
//   const grammarIndicators = ['grammar', 'mistake', 'error', 'incorrect'];
//   const mistakesFound = grammarIndicators.filter(indicator =>
//     text.toLowerCase().includes(indicator)
//   );
//   return mistakesFound.length;
// };

// // Programming understanding
// export const assessProgrammingUnderstanding = (text) => {
//   const programmingKeywords = ['algorithm', 'data structure', 'complexity', 'syntax', 'logic'];
//   const foundKeywords = programmingKeywords.filter(keyword =>
//     text.toLowerCase().includes(keyword)
//   );
//   return foundKeywords.length;
// };

// // Score calculation
// export const calculateScore = (grammarMistakes, programmingUnderstandingScore) => {
//   const grammarPenalty = grammarMistakes * 0.5;
//   const understandingScore = programmingUnderstandingScore;
//   const rawScore = understandingScore - grammarPenalty;
//   return Math.min(10, Math.max(0, rawScore)); // clamp between 0-10
// };

// // Calculate average score from multiple answers
// export const calculateAverageScore = (answers) => {
//   const totalScore = answers.reduce((sum, { grammarMistakes, programmingUnderstandingScore }) => {
//     const score = calculateScore(grammarMistakes, programmingUnderstandingScore);
//     return sum + score;
//   }, 0);
//   const averageScore = totalScore / answers.length;
//   return parseFloat(averageScore.toFixed(2));
// };

// // Main analysis wrapper
// export const performAdditionalAnalysis = async (analysisText) => {
//   const grammarMistakes = analyzeGrammarMistakes(analysisText);
//   const programmingUnderstandingScore = assessProgrammingUnderstanding(analysisText);
//   const totalScore = calculateScore(grammarMistakes, programmingUnderstandingScore);
//     // console.log('Theoretical Questions & Answers:', questions);
//     console.log('\nFeedback from Gemini:', analysisText);
//     console.log('\nGrammar Mistakes in Feedback:',grammarMistakes);
//     console.log('Programming Understanding Score:', programmingUnderstandingScore);
//     console.log('Total Score from Feedback Analysis:',totalScore);
//     // console.log('Average Score from All Answers:', averageScore);
//   return {
//     analysisText,
//     grammarMistakes,
//     programmingUnderstandingScore,
//     totalScore
//   };


  
// };



// import axios from 'axios';
// import { API_KEY } from '../../services/ApplicantAPIService';



// // Helper function to clean text
// const cleanText = (text) => {
//   return text
//     .replace(/[*_~]+/g, '')               // remove *, _, ~
//     .replace(/\u200B/g, '')               // remove zero-width space
//     .replace(/[^\x00-\x7F]+/g, '')        // remove non-ASCII characters
//     .replace(/\r?\n[\s\r\n]*/g, '\n')     // normalize line breaks
//     .trim();
// };
// // Helper to parse Gemini response
// const parseQuestionsFromGemini = (text) => {
//   const questions = [];
//   const lines = text.split('\n');

//   let currentQuestion = null;

//   lines.forEach((line) => {
//     if (line.startsWith('Q')) {
//       if (currentQuestion) {
//         questions.push(currentQuestion);
//       }
//       currentQuestion = {
//         question: line.replace(/^Q\d*:\s*/, '').trim(),
//         answer: ''
//       };
//     } else if (line.startsWith('Answer:')) {
//       currentQuestion.answer += line.replace('Answer:', '').trim() + ' ';
//     } else if (currentQuestion) {
//       currentQuestion.answer += line.trim() + ' ';
//     }
//   });

//   if (currentQuestion) {
//     currentQuestion.answer = cleanText(currentQuestion.answer);
//     questions.push(currentQuestion);
   
//   }

//   return questions;
// };

// // Main function to fetch AI-generated questions
// export const fetchAIQuestions = async () => {
//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//       {
//         contents: [{
//           parts: [{
//             text: `Generate 5 theoretical interview questions related to Software Development. Which checks interpersonal skill, problem solveing skills. Each question should have:
//             - A theoretical question (no code).
//             - A detailed explanation as the answer.

//             Format:
//             Q1: What is [skill]?
//             Answer: [Provide a detailed theoretical explanation of the concept.]

//             Make the questions focused on theoretical concepts of the given skill. 
//              Keep each answer within 5 lines maximum.`
            
//           }]
//         }]
//       },
//       { headers: { 'Content-Type': 'application/json' } }
//     );

//     const resultText = response.data.candidates[0].content.parts[0].text;
//     const formattedQuestions = parseQuestionsFromGemini(resultText);

//     return formattedQuestions;
//   } catch (error) {
//     console.error('Error fetching theoretical questions:', error);
//     throw error;
//   }
// };


// // Function to fetch questions based on skill
// export const fetchQuestionsFromGemini = async (skill) => {
//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//       {
//         contents: [{
//           parts: [{
//             text: `Generate 3 theoretical interview questions related to ${skill}. Each question should have:
//             - A theoretical question (no code).
//             - A detailed explanation as the answer.

//             Format:
//             Q1: What is [skill]?
//             Answer: [Provide a detailed theoretical explanation of the concept.]

//             Make the questions focused on theoretical concepts of the given skill.`
//           }]
//         }]
//       },
//       { headers: { 'Content-Type': 'application/json' } }
//     );

//     // Parse the JSON string inside the response
//     const resultText = response.data.candidates[0].content.parts[0].text;
//     const questions = resultText.split('\n').filter(line => line.startsWith('Q'));

//     // Structure the questions and return them
//     const formattedQuestions = questions.map((question) => {
//       const parts = question.split('Answer:');
//       const questionText = parts[0].replace('Q:', '').trim();
//       const answerText = parts[1]?.trim();

//       return {
//         question: questionText,
//         answer: answerText
//       };
//     });

//     return formattedQuestions;
//   } catch (error) {
//     console.error('Error fetching theoretical questions:', error);
//     throw error;
//   }
// };

// // Function to analyze answers with feedback, grammar check, and scoring
// export const analyzeAnswers = async (answers) => {
//   const formatted = answers
//     .map((ans, i) => `Q${i + 1}: ${ans.question}\nA${i + 1}: ${ans.answer}`)
//     .join('\n\n');
  
//   // Send answers to Gemini for analysis
//   const response = await axios.post(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//     {
//       contents: [{
//         parts: [{
//           text: `Analyze the following theoretical answers and provide feedback. Include grammar mistakes, programming understanding, and score.\n\n${formatted}`
//         }]
//       }]
//     },
//     { headers: { 'Content-Type': 'application/json' } }
//   );

//   const analysisText = cleanText(response.data.candidates[0]?.content?.parts[0]?.text || "No analysis available.");

//   // Now add more checks (for grammar, programming, and score)
//   const analysis = await performAdditionalAnalysis(analysisText);



//   return analysis;
// };

// // Additional analysis for grammar mistakes, understanding, and scoring
// // Additional analysis for grammar mistakes, understanding, and scoring
// const performAdditionalAnalysis = async (analysisText) => {
//   // Simulated scoring logic (you can modify this based on actual feedback or criteria)
//   const individualScores = calculateScoresBasedOnText(analysisText);

//   const totalScore = individualScores.reduce((sum, score) => sum + score, 0);
//   const averageScore = totalScore / individualScores.length;

//   return {
//     analysisText,
//     totalScore,
//     averageScore,
//   };
// };

// // Example of calculating individual scores based on analysis text
// const calculateScoresBasedOnText = (text) => {
//   // For this example, let's assume the score is based on the number of times 'correct' appears
//   // You can replace this with more complex logic
//   const scores = [];
//   const questions = text.split('\n\n');  // Assuming each question-answer pair is separated by double line breaks
  
//   questions.forEach((questionAnswer, index) => {
//     let score = 0;

//     // Let's simulate scoring logic: check if the answer is marked as 'correct' in some way
//     if (questionAnswer.toLowerCase().includes('correct')) {
//       score = 90; // 1 point for correct
//     } else {
//       score = 0; // No points for incorrect or unclear answers
//     }

//     scores.push(score);
//   });

//   return scores;
// };




import axios from 'axios';
import { API_KEY } from '../../services/ApplicantAPIService';
 
 
 
// Helper function to clean text
const cleanText = (text) => {
  return text
    .replace(/[*_~]+/g, '')               // remove *, _, ~
    .replace(/\u200B/g, '')               // remove zero-width space
    .replace(/[^\x00-\x7F]+/g, '')        // remove non-ASCII characters
    .replace(/\r?\n[\s\r\n]*/g, '\n')     // normalize line breaks
    .trim();
};
// Helper to parse Gemini response
const parseQuestionsFromGemini = (text) => {
  const questions = [];
  const lines = text.split('\n');
 
  let currentQuestion = null;
 
  lines.forEach((line) => {
    if (line.startsWith('Q')) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      currentQuestion = {
        question: line.replace(/^Q\d*:\s*/, '').trim(),
        answer: ''
      };
    } else if (line.startsWith('Answer:')) {
      currentQuestion.answer += line.replace('Answer:', '').trim() + ' ';
    } else if (currentQuestion) {
      currentQuestion.answer += line.trim() + ' ';
    }
  });
 
  if (currentQuestion) {
    currentQuestion.answer = cleanText(currentQuestion.answer);
    questions.push(currentQuestion);
   
  }
 
  return questions;
};
 
// Main function to fetch AI-generated questions
export const fetchAIQuestions = async () => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate 5 theoretical interview questions related to Software Development. Which checks interpersonal skill, problem solveing skills. Each question should have:
            - A theoretical question (no code).
            - A detailed explanation as the answer.
 
            Format:
            Q1: What is [skill]?
            Answer: [Provide a detailed theoretical explanation of the concept.]
 
            Make the questions focused on theoretical concepts of the given skill.
             Keep each answer within 5 lines maximum.`
           
          }]
        }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
 
    const resultText = response.data.candidates[0].content.parts[0].text;
    const formattedQuestions = parseQuestionsFromGemini(resultText);
 
    return formattedQuestions;
  } catch (error) {
    console.error('Error fetching theoretical questions:', error);
    throw error;
  }
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
 
function extractScoreFromAnalysis(text) {
  // Updated regex to match "Average Score: 8.5/10"
  const lines = text.split('\n').map(line => line.trim());
  const scoreLines = lines.filter(line => /^Average Score:\s*\d+(\.\d+)?\/10/i.test(line));

  if (scoreLines.length === 0) return null;

  const lastLine = scoreLines[scoreLines.length - 1];
  const match = lastLine.match(/Average Score:\s*(\d+(\.\d+)?)/i);

  return match ? parseFloat(match[1]) : null;
}
 
const analysisText = `
Some sample format: 
"Average Score: 8.3/10" is expected in the response.

Now analyzing...
Answer 1 was good.
Answer 2 needs improvement.

`;

export const overallScore = extractScoreFromAnalysis(analysisText);
console.log("Final Extracted Score:", overallScore); // Output: 6.9
//  export const overallScore = extractScoreFromAnalysis(analysisText);
 
if (overallScore !== null) {
  console.log(`Extracted Score: ${overallScore}`);
} else {
  console.log("Score could not be extracted.");
}
 
 
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
          text: `Analyze the following theoretical answers and provide feedback. Check grammar mistakes, programming understanding on each given answer then give avarage score considering all the question in total in the sacle of 10 at last line with text average score is\n\n${formatted}`
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
 
   const overallAverageScore = extractScoreFromAnalysis(analysisText);
console.log(overallAverageScore);
 
  return {
    analysisText,
overallAverageScore
  };
};