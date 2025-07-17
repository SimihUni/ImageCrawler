import AddUrl from "./AddUrl.jsx";
import UrlList from "./UrlList.jsx";
import Layout from "./Layout.jsx";
import BentoGrid from "./BentoGrid.jsx";

function App() {
  return (
    <>
      <Layout children={<BentoGrid children={[<AddUrl />, <UrlList />, <button onClick={() => {fetch(`${import.meta.env?.VITE_BACKEND_URL}/crud/task`).then().catch()}}>Task</button>]} />} />
    </>
  );
}

export default App;
