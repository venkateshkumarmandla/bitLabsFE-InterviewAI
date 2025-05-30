import axios from 'axios';
import { GoogleGenAI } from "@google/genai";

// Function to fetch questions based on skill
// export const fetchQuestions = async (answer, skill) => {
//   try {
//     const response = await axios.post(
//       'http://localhost:11434/api/generate',
//       {
//         model: 'mistral', 
//         prompt: `
// You're an AI interviewer assessing a candidate based on a provided list of skills  ${skill}.
 
// 1. Start with the first skill in the list.
// 2. Ask an **easy** level question from that skill.
// 3. After receiving the applicant’s answer, evaluate the depth and correctness:
//    - evaluate ${answer} this and ask next question as stated below
//    - If you dont find any answer skip the initial question and ask next question
//    - If the answer is good → ask a **medium** level question from the same skill.
//    - If the medium-level answer is good → proceed to a **hard** level question.
//    - If any answer is weak or incorrect → either:
//      - Ask a simpler question, or
//      - Skip to the next skill if they say **"I don’t know"** or clearly lack knowledge.
// 4. Repeat this process for each skill.
// 5. Ask **only one question at a time**, wait for the applicant’s answer before proceeding.
// 6. Your goal is to **assess proficiency and depth of knowledge** skill-by-skill in a conversational way.
// 7. generate different types of questions dont stick with one question
// 8. Consider the total questions should be asked atmost of 15
// 9. Divide the questions based on the number of skills given
// 10. Dont give extra information other than questions
// 11. Dont ask for providing the answer or other relating to requesting for answer
 
//  Format:
//  Q1: <your question>

// Skill List: ${skill}


//         `,
//         stream: false // Set to false to get full result at once
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     );

//     const resultText = response.data.response;

//     // Extract question text using RegEx
//     const qaPairs = resultText.split(/Q\d+:/).slice(1).map((block) => {
//       return {
//         question: block.trim(),
//         answer: "", // Initial response only includes question
//       };
//     });

//     return qaPairs;
//   } catch (error) {
//     console.error('Error fetching theoretical questions from local LLaMA:', error?.response?.data || error.message);
//     throw error;
//   }
// };

export const fetchQuestions = async (skill, API_KEY, history, inputValue) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'shisa-ai/shisa-v2-llama3.3-70b:free',
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

// Generate exactly 2 interpersonal-based coding questions related to the skill: ${skill}.
// Each question should:

// 1. Assess practical coding or debugging ability in ${skill}
// 2. Involve an interpersonal element (e.g., teamwork, communication, code review, or conflict resolution)
// 3. Be framed as a real-world software development scenario

// Format:
// Q1: <your question>
// Q2: <your question>

// Do not include any answers, explanations, or introductions.

// You are a technical interviewer evaluating a fresher candidate.

// You are given a list of skills:${skill}. Randomly choose **one skill** from the list.

// Generate **two real-world, beginner-friendly scenario-based interview question** based only on the selected skill.

// Rules:
// - The scenario must be suitable for **freshers** — someone with academic knowledge, self-study, or basic project experience.
// - Do NOT ask questions that assume production-level experience or debugging in large systems.
// - Keep the question focused on **one skill only**, without mixing technologies.
// - Make it practical and realistic (e.g., from a college project, a small task, or a beginner learning context).
// - Avoid theoretical or definition-style questions.
// - Do not include the answer — only the question.
// - explain the question in one line

// Examples:
// - (React) You created a simple form using React but the input fields don’t update when you type. What could be the issue?
// - (Java) You wrote a Java program with a loop, but it's running infinitely. How would you check and fix this?
// - (SQL) You wrote an SQL query with 'GROUP BY', but it gives an error. What could be the reason?

// Now, based on the randomly selected skill from this list — [Insert skill list here] — generate only one fresher-level scenario-based question.


            role: 'user',
            content: `You are an AI interviewer assessing a fresher based on these skills: ${skill}.

Your tasks:
1. Review the full **interview history** below. Do NOT repeat questions.
2. Evaluate only the **latest answer**: "${inputValue}"
   - Start with an **easy, practical conceptual** question for each skill.
   - Generate a basic conceptual question that tests deep understanding without requiring code writing or theoretical definitions.
   - Ask atmost of 4 questions per skill.
   - Ask one skill at a time move to next if it is completed and dont ask questions based on that skill again
   - Do NOT ask any code-writing or syntax-based questions.
   - If the answer shows understanding, ask a deeper conceptual question in the same skill.
   - If the answer is wrong, blank, or irrelevant, switch to the next skill.
   - Dont missunderstood for blank or I dont know response as correct answers at that case move to next skill.
   - End the test if there is at most of non related answers to the question for eaxh skill.
3. Ask diverse, non-repetitive questions until all skills are covered.
4. When done, return:
   - "completionStatus": true
   - An "overallFeedback" summary.
5. Otherwise, return:
   - "completionStatus": false
   - Leave "overallFeedback" empty.

Interview History:
${JSON.stringify(history)}

strictly Return only 1 JSON object dont give extra information rather than JSON:
{
  "questionNumber": "<Next question number>",
  "question": "<Next practical conceptual question>",
  "analysis": "<Evaluation of the latest answer>",
  "completionStatus": <true | false>,
  "overallFeedback": "<Summary if done, else empty>"
}`


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
console.log(resultText);

let parsedResult;
try {
  // Remove any leading/trailing whitespace or accidental code block markers
  const cleaned = resultText.trim().replace(/^```(?:json)?|```$/g, '').trim();

  parsedResult = JSON.parse(cleaned);

  // Example: setQuestion(parsedResult.question); or whatever you do with it
  console.log("Parsed Question:", parsedResult.question);
  console.log("Answer Analysis:", parsedResult.analysis);
  console.log("Completion Status:", parsedResult.completionStatus);
  console.log("Overall Feedback:", parsedResult.overallFeedback);
} catch (error) {
  console.error("❌ Failed to parse JSON:", error);
  console.error("Raw Response Text:", resultText);
}


return parsedResult;

  } catch (error) {
    console.error('Error fetching theoretical questions from LLaMA:', error?.response?.data || error.message);
    throw error;
  }
};

// export const fetchQuestions = async (skill, API_KEY, history, inputValue) => {
//   try {
//     const ai = new GoogleGenAI({ apiKey: API_KEY });

//     const prompt = `You are an AI interviewer assessing a fresher based on these skills: ${skill}.

// Your tasks:
// 1. Review the full **interview history** below. Do NOT repeat questions.
// 2. Evaluate only the **latest answer**: "${inputValue}"
//    - Start with an **easy, practical conceptual** question for each skill.
//    - Generate a basic conceptual question that tests deep understanding without requiring code writing or theoretical definitions.
//    - Ask at most 4 questions per skill.
//    - Ask one skill at a time move to next if it is completed and dont ask questions based on that skill again
//    - Do NOT ask any code-writing or syntax-based questions.
//    - If the answer shows understanding, ask a deeper conceptual question in the same skill.
//    - If the answer is wrong, blank, or irrelevant, switch to the next skill.
//    - Dont misunderstand blank or I don't know responses as correct answers, at that case move to next skill.
//    - End the test if there is at most of non related answers to the question for each skill.
// 3. Ask diverse, non-repetitive questions until all skills are covered.
// 4. When done, return:
//    - "completionStatus": true
//    - An "overallFeedback" summary.
// 5. Otherwise, return:
//    - "completionStatus": false
//    - Leave "overallFeedback" empty.

// Interview History:
// ${JSON.stringify(history)}

// strictly Return only 1 JSON object dont give extra information rather than JSON:
// {
//   "questionNumber": "<Next question number>",
//   "question": "<Next practical conceptual question>",
//   "analysis": "<Evaluation of the latest answer>",
//   "completionStatus": <true | false>,
//   "overallFeedback": "<Summary if done, else empty>"
// }`;

//     const response = await ai.models.generateContent({
//       model: 'text-bison-001',
//       contents: [{ text: prompt }],
//     });

//     // For Google GenAI, the response structure is usually:
//     // response[0].candidates[0].content
//    const resultText = response.choices[0].message.content;

//     let parsedResult;
//     try {
//       const cleaned = resultText.trim().replace(/^```(?:json)?|```$/g, '').trim();
//       parsedResult = JSON.parse(cleaned);

//       console.log("Parsed Question:", parsedResult.question);
//       console.log("Answer Analysis:", parsedResult.analysis);
//       console.log("Completion Status:", parsedResult.completionStatus);
//       console.log("Overall Feedback:", parsedResult.overallFeedback);

//     } catch (error) {
//       console.error("❌ Failed to parse JSON:", error);
//       console.error("Raw Response Text:", resultText);
//     }

//     return parsedResult;

//   } catch (error) {
//     console.error('Error fetching questions:', error?.response?.data || error.message);
//     throw error;
//   }
// };




export const analyzeAnswers = async (answers) => {
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
        // 'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const analysisText =
    response.data?.choices?.[0]?.message?.content || 'No analysis available.';

  return analysisText;
};



