import {useState} from 'react'
import {CallGPT} from "./api/gpt";

function App() {

  const [data, setData] = useState("");
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
      <div>data : {JSON.stringify(data)}</div>
      <div>
        isLoading : {isLoading ? "loading.." : "finish"}
      </div>
    </>
  );
}

export default App
