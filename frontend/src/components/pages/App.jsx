import AddUrl from "../AddUrl.jsx";
import UrlList from "../UrlList.jsx";
import Layout from "../layout/Layout.jsx";
import BentoGrid from "../layout/BentoGrid.jsx";
import Graphs from "./Graphs.jsx";

function App() {
  return (
    <>
      <Layout
        children={
          <BentoGrid
            children={[
              <AddUrl />,
              <Graphs />,
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
                onClick={() => {
                  fetch(`${import.meta.env?.VITE_BACKEND_URL}/crud/task`)
                    .then()
                    .catch();
                }}
              >
                Run Task
              </button>,
              <UrlList />,
            ]}
          />
        }
      />
    </>
  );
}

export default App;
