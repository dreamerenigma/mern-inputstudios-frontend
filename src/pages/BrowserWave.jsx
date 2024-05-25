
export default function BrowserWave() {
  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-24 h-24 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Заглавный Текст</h1>
        <p className="text-lg mb-4">Текст ниже изображения</p>
        <div>
          <button className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-700">Загрузка</button>
        </div>
    </div>
  );
}
