import Link from "next/link";
import { BiSolidFoodMenu } from "react-icons/bi";

const Home = () => {
  return (
    <main className="flex flex-col justify-center items-center text-center min-h-screen px-4">
      <BiSolidFoodMenu className="mx-auto mb-4 text-orange-600" size={60} />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
        Welcome to Meal Book
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        An app for saving and viewing recipes
      </p>

      <div className="flex flex-col md:flex-row gap-4 justify-center animate-slide opacity-0">
        <Link
          href="/recipes/new"
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          Create a Recipe
        </Link>
        <Link
          href="/recipes"
          className="bg-blue-100 text-gray px-6 py-3 rounded shadow hover:bg-blue-200 transition"
        >
          View Recipes
        </Link>
      </div>
    </main>
  );
};

export default Home;
