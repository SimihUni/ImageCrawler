function ErrorPage({ error = 404 , message = "Page Not Found" }) {
  return (
    <>
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="container flex flex-col items-center ">
          <div class="flex flex-col gap-6 max-w-md text-center bg-white px-8 pt-6 pb-8 shadow-md rounded">
            <h2 class="font-extrabold text-7xl text-gray-600 ">
              <span class="sr-only">Error</span>
              {error}
            </h2>
            <p class="text-2xl md:text-3xl dark:text-gray-300">
              {message}
            </p>
            <a
              href="/"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Back to homepage
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
