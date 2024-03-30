import {useState} from 'react'
import {CallGPT} from "./api/gpt";

interface Data {
  title: string;
  thumbnail: string;
  summary: string;
  emotional_content: string;
  emotional_result: string;
}


function App() {

  const dummyData = JSON.parse(`
{
  "title": "개발자의 성장",
  "thumbnail": "coding, growth, problem-solving",
  "summary": "Attended coding lesson, faced many bugs in project…GPT, questioned if this method helps development.",
  "emotional_content": "오늘은 코딩 강의를 들었다. 프로젝트를 진행하면서 예상치 못한 버그가 많이 발생했다. 다행… 해결할 수 있었다. 하지만 이렇게 하는 것이 실제 개발에 도움이 되는지 의문이 들었다.",
  "emotional_result": "현재 상황에서는 문제를 해결하는 것에 집중했지만, 자신의 능력에 대한 의구심이 드는 순간이었다. 이로 인해 더 나은 접근 방식을 찾아보는 시간이 필요하다."
}
  `);

  const [data, setData] = useState<Data>(dummyData);
  const [isLoading, setIsLoading] = useState(false);


  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `코딩 강의를 들었다. 프로젝트에 버그가 많이 나왔음. 역시 GPT 를 통해 해결했다. 근데 이렇게 해결하는게 개발에 도움이 될까?`
      });
      setData(JSON.parse(message))
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  console.log(">> data: ", data)
  return (
    <>
      <button onClick={handleClickAPICall}>GPT API call</button>
      {/*<div>data : {JSON.stringify(data)}</div>*/}
      <div>data : {data.title}</div>
      <div>thumbnail : {data.thumbnail}</div>
      <div>summary : {data.summary}</div>
      <div>emotional_content : {data.emotional_content}</div>
      <div>
        isLoading : {isLoading ? "loading.." : "finish"}
      </div>
    </>
  );
}

export default App
