import axios from 'axios';

// Function to fetch questions based on skill
export const fetchQuestions = async (skill, API_KEY) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          {
            role: 'user',
            content: `Generate 2 code-based conceptual questions related to the topic "${skill}". The questions should be relevant to real-world development scenarios using the language or technology mentioned.
            Each question should include:
- A clear explanation of a real-time use case
- A concise question prompt
- 2 test cases with one sample input and output for better understanding

Format:
Q1: Validate Email Format in Java

Use Case:
In a user registration system, it’s important to verify whether the input email is in a valid format before storing it in the database.

Test Cases:

Input: test@example.com  
Output: true

Input: invalid-email@com  
Output: false

Ensure the questions are related to practical applications and are relevant for coding practice. The questions should involve logic or implementation that a developer might face in day-to-day work.
Note: Give only use cases and avoid test cases for the programming languages which does have interpeter or compiler console`,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const resultText = response.data.choices[0].message.content;

    // Extract each Q&A pair using RegEx
    const qaPairs = resultText.split(/Q\d+:/).slice(1).map(block => {
      const [questionPart, ...answerParts] = block.split('Answer:');
      return {
        question: questionPart.trim(),
        answer: answerParts.join('Answer:').trim(),
      };
    });

    return qaPairs;
  } catch (error) {
    console.error('Error fetching theoretical questions from LLaMA:', error?.response?.data || error.message);
    throw error;
  }
};



function extractScoreFromAnalysis(analysisText) {
  // Updated regex to match "Average Score: 8.5/10"
  const regex = /Average Score:\s*(\d+(\.\d+)?)/;

  const match = analysisText.match(regex);

  if (match) {
    return parseFloat(match[1]); // Convert matched number to float
  } else {
    return null; // Return null if no match
  }
}


export const analyzeAnswers = async (answers, API_KEY) => {
  const formatted = answers
    .map((ans, i) => `Q${i + 1}: ${ans.question}\nA${i + 1}: ${ans.answer}`)
    .join('\n\n');

  const prompt = `You are an expert reviewer. Analyze the following answers. For each answer:

- Evaluate the programming knowledge and conceptual understanding.
- Give individual feedback.
At the end, provide an average score (out of 10) across all answers with the phrase: "Average Score is: <score>".

${formatted}`;

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'meta-llama/llama-3.3-70b-instruct:free',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const analysisText =
    response.data?.choices?.[0]?.message?.content || 'No analysis available.';

  // Optionally process or extract average score
  const analysis = await performAdditionalAnalysis(analysisText);
  console.log(analysis.overallAverageScore);
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


