import AddUrl from "../AddUrl.jsx";
import UrlList from "../UrlList.jsx";
import Layout from "../layout/Layout.jsx";
import BentoGrid from "../layout/BentoGrid.jsx";

function App() {
  return (
    <>
      <Layout children={<BentoGrid children={[<AddUrl />, <UrlList />, <button onClick={() => {fetch(`${import.meta.env?.VITE_BACKEND_URL}/crud/task`).then().catch()}}>Task</button>]} />} />
    </>
  );
}

export default App;
