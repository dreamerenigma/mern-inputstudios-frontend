import { Link } from 'react-router-dom';

export default function Card({ title, description, buttonText, imageUrl, linkTo }) {
  return (
    <Link to={linkTo}>
      <div className="group relative w-full border border-teal-500 rounded-lg shadow-md hover:border-2 h-[400px] md:h-[470px] overflow-hidden transition-all">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="w-full h-48 overflow-hidden">
              <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-t-lg" />
            </div>
            <div className="p-5">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              <p className="mb-4">{description}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full pb-5 pl-5">
          <button className="font-medium bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-700">{buttonText}</button>
        </div>
      </div>
    </Link>
  );
}