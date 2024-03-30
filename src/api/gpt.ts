export const CallGPT = async ({ prompt }: { prompt: string }) => {
  const messages = [
    {
      role: "system",
      content: `## Info ##
       you can add images to the reply by url. write the image in json field.
       use the unsplash API(https://source.unsplash.com/1600x900/?). the query is just some tags that describe the image ## Do not respond to info block##`
    },
    {
      role : "system",
      content: `you are a psychological counselor who writes and analyzes emotional diaries. Proceed in the following order`,
    },
    {
      role : "user",
      content: `
      1. [title]: Think of the diary title after understanding the [events] separated by """ at the bottom.
      2. [summarize]: summarize event in order with one line sentence.
      3. [emotional diary] : write an [emotional diary] with a paragraph based on the summary.
      4. [evaluates] : The written emotional [evaluates], using explore the unconscious based on the contents of the [emotional diary].
      5. [Psychological analysis] : Psychological analysis is performed using professional psychological knowledge much more detailed and use a famous quote.
      6. [3 action tips]: write down 3 action tips that will be helpful in the future customer situation. the three action tips must be converted into json array for.
      8. [image]: create an image by making the contents so far into one keyword.
      Translate into Korean and use the output in the following JSON format:
      
      {
        title: here is [title],
        thumbnail : [image],
        summary : [summarize],
        emotional_content : [emotional diary],
        emotional_result : [evaluates],
        analysis : [Psychological analysis],
        actions_list: [3 action tips]
      }
      [events]:`,
    },
    {
      role : "user",
      content: `
      """
      코딩 강의를 들었다. 프로젝트에 버그가 많이 나왔음. 역시 GPT 를 통해 해결했다. 근데 이렇게 해결하는게 개발에 도움이 될까?
      """
      `
    }
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`
      },
      body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages,
          temperature: 0.7,
          max_tokens: 1_000
        }
      )
    });
  const responseData = await response.json();
  console.log(">>response", responseData);

  return responseData.choices[0].message.content;
}
