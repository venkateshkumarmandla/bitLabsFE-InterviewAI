import { GoogleGenerativeAI } from "@google/generative-ai";


// export const fetchQuestions = async (skill, API_KEY, history, inputValue) => {
//   try {
//     const response = await axios.post(
//       'https://openrouter.ai/api/v1/chat/completions',
//       {
//         model: 'shisa-ai/shisa-v2-llama3.3-70b:free',
//         messages: [
//           {
//             role: 'user',
//             content: `You are an AI interviewer assessing a fresher based on these skills: ${skill}.

// Your tasks:
// 1. Review the full **interview history** below. Do NOT repeat questions.
// 2. Evaluate only the **latest answer**: "${inputValue}"
//    - Start with an **easy, practical conceptual** question for each skill.
//    - Generate a basic conceptual question that tests deep understanding without requiring code writing or theoretical definitions.
//    - Ask atmost of 4 questions per skill.
//    - Ask one skill at a time move to next if it is completed and dont ask questions based on that skill again
//    - Do NOT ask any code-writing or syntax-based questions.
//    - If the answer shows understanding, ask a deeper conceptual question in the same skill.
//    - If the answer is wrong, blank, or irrelevant, switch to the next skill.
//    - Dont missunderstood for blank or I dont know response as correct answers at that case move to next skill.
//    - End the test if there is at most of non related answers to the question for eaxh skill.
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
// }`


//  },
//         ],
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//    const resultText = response.data.choices[0].message.content;
// console.log(resultText);

// let parsedResult;
// try {
//   // Remove any leading/trailing whitespace or accidental code block markers
//   const cleaned = resultText.trim().replace(/^```(?:json)?|```$/g, '').trim();

//   parsedResult = JSON.parse(cleaned);

//   // Example: setQuestion(parsedResult.question); or whatever you do with it
//   console.log("Parsed Question:", parsedResult.question);
//   console.log("Answer Analysis:", parsedResult.analysis);
//   console.log("Completion Status:", parsedResult.completionStatus);
//   console.log("Overall Feedback:", parsedResult.overallFeedback);
// } catch (error) {
//   console.error("❌ Failed to parse JSON:", error);
//   console.error("Raw Response Text:", resultText);
// }


// return parsedResult;

//   } catch (error) {
//     console.error('Error fetching theoretical questions from LLaMA:', error?.response?.data || error.message);
//     throw error;
//   }
// };


export const fetchQuestions = async (skill, API_KEY, history, inputValue) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-1.5-pro"

    const prompt = `You are an AI interviewer assessing a fresher based on these skills: ${skill}.

Your tasks:
1. Review the full **interview history** below. Do NOT repeat questions.
2. Evaluate only the **latest answer**: "${inputValue}"
   - Look for history first, Strictly Move to next skill if there were more than 2 non related or blank in the latest answers, if no skill found for next end the test and give over all feedback.
   - Start with an **easy, practical conceptual** question for each skill.
   - Generate a basic conceptual question that tests deep understanding without requiring code writing or theoretical definitions.
   - Ask one skill at a time, move to the next if it is completed, and don’t ask questions based on that skill again.
   - Do NOT ask any code-writing or syntax-based questions.
   - If the answer shows understanding, ask a deeper conceptual question in the same skill.
   - If the answer is wrong, blank, or irrelevant, switch to the next skill.
   - Make sure to ask at most of 5 questions for each skill if response is good for the given question.
   - Don’t misunderstand blank or "I don't know" responses as correct answers; in that case, move to next skill.
   - strictly End the test if there are more than 4 non related or I dont know answers or blank answers were given
3. Ask diverse, non-repetitive questions until all skills are covered.
4. When done, return:
   - "completionStatus": true
   - An "overallFeedback" summary.
5. Otherwise, return:
   - "completionStatus": false
   - Leave "overallFeedback" empty.

Interview History:
${JSON.stringify(history)}

Strictly return only 1 JSON object. Don’t give extra information:

{
  "questionNumber": "<Next question number>",
  "question": "<Next practical conceptual question>",
  "analysis": "<Evaluation of the latest answer>",
  "completionStatus": <true | false>,
  "overallFeedback": "<Summary if done, else empty>"
}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const resultText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let parsedResult;
    try {
      const cleaned = resultText.trim().replace(/^```(?:json)?|```$/g, '').trim();
      parsedResult = JSON.parse(cleaned);

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
    console.error("Error fetching questions:", error?.response?.data || error.message);
    throw error;
  }
};






