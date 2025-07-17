import { useEffect, useState } from "react";

function UrlList() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(<></>)
  useEffect(() => {
    try {
        setLoading(true);
        const apiPath = `${import.meta.env?.VITE_BACKEND_URL}/crud/get-urls`;
        fetch(apiPath)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            setLoading(false);
            return response.json();
          })
          .then((data) => {
            console.log("Fetched URLs:", data.urls);
            setUrls(data.urls || []);
            setList(data.urls.map((url, index) => (
              <li key={index} className="py-2 px-4 border-b">
                {url.url}
              </li>
            )));
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error fetching URLs:", error);
          });
    } catch (error) {
      console.error("Error in UrlList component:", error);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-6">URL List</h1>
        <ul>
          {loading ? (
            <li>Loading...</li>
          ) : urls.length > 0 ? list : (
            <li>No URLs found.</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default UrlList;
