import { useState } from "react";

function App() {
  console.log("Frontend is running");
  console.log(import.meta.env?.VITE_BACKEND_URL);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
          <h1 className="text-center text-2xl font-bold mb-6">Image Crawler</h1>
          <form action={`${import.meta.env?.VITE_BACKEND_URL}/crud/add-url`} method="POST" >
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
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
