
export default function QuantumEngine() {
  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mb-8">
          <img src="https://i.ibb.co/tb3kYnB/logo-quantum-engine.png" alt="QuantumEngine" className=""/>
        </div>
        <h1 className="text-3xl font-bold mb-4">Заглавный Текст</h1>
        <p className="text-lg mb-4">Текст ниже изображения</p>
        <div>
          <button className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-700">Загрузка</button>
        </div>
    </div>
  );
}
