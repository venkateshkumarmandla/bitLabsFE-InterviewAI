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
//             Format:
// Q1: Validate Email Format in Java

// Use Case:
// In a user registration system, it’s important to verify whether the input email is in a valid format before storing it in the database.

// Test Cases:

// Input: test@example.com  
// Output: true

// Input: invalid-email@com  
// Output: false

            role: 'user',
            content: `Generate exactly 2 interpersonal-based coding questions related to the skill: ${skill}.
Each question should:

1. Assess practical coding or debugging ability in ${skill}
2. Involve an interpersonal element (e.g., teamwork, communication, code review, or conflict resolution)
3. Be framed as a real-world software development scenario

Format:
Q1: <your question>
Q2: <your question>

Do not include any answers, explanations, or introductions.
`,
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


export const analyzeAnswers = async (answers, API_KEY) => {
  const formatted = answers
    .map((ans, i) => `Q${i + 1}: ${ans.question}\nA${i + 1}: ${ans.answer}`)
    .join('\n\n');

  const prompt = `You are an expert reviewer. Analyze the following answers. For each answer:

- Evaluate the programming knowledge and conceptual understanding.
- Give individual feedback.
- If you find null for all the answers then give 0
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

  return analysisText;
};



