function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-11/12 w-full h-fit">
        {children}
      </div>
    </div>
  );
}

export default Layout;