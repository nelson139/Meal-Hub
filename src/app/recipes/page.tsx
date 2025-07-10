import { getRecipes } from "@/actions/recipe.actions";
import { logEvent } from "@/utils/sentry";
import Link from "next/link";
import { getTimeLengthClass } from "@/utils/ui";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

const RecipesPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const recipes = await getRecipes();

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        Recipes
      </h1>
      {recipes.length == 0 ? (
        <p className="text-center text-gray-600">No Recipes Yet</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex justify-between items-center bg-white rounded-lg shadow border border-gray-200 p-6"
            >
              {/* Left Side */}
              <div>
                <h2 className="text-xl font-semibold text-blue-600">
                  {recipe.name}
                </h2>
              </div>
              {/* Right Side */}
              <div className="text-right space-y-2">
                <div className="text-sm text-gray-500">
                  Time Length:{" "}
                  <span className={getTimeLengthClass(recipe.timeLength)}>
                    {recipe.timeLength}
                  </span>
                </div>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="inline-block mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition text-center"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
