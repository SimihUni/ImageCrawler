import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(formData) {
    setLoading(true);
    setSuccess(false);
    setError(null);
    const newUrl = formData.get("url");
    const apiPath = `${import.meta.env?.VITE_BACKEND_URL}/crud/add-url`;
    fetch(apiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: newUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        formData.target.reset();
        setLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setError("Failed to add URL. Please try again.");
      });
    return false; // Prevent default form submission
  }



  console.log(import.meta.env?.VITE_BACKEND_URL);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
          <h1 className="text-center text-2xl font-bold mb-6">Image Crawler</h1>
          <form action={handleSubmit} method="POST" >
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="url">
                Add url
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="url"
                type="text"
                placeholder="Enter URL"
                name="url"
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={loading}
            >
              Submit
            </button>
            {loading && (
              <div className="mt-4 text-center text-gray-500">
                Loading...
              </div>
            )}
            {success && (
              <div className="mt-4 text-center text-green-600">
                URL added successfully!
              </div>
            )}
            {error && (
              <div className="mt-4 text-center text-red-600">
                {error}
              </div>
            )}
            
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
