import { getRecipeById } from "@/actions/recipe.actions";
import { logEvent } from "@/utils/sentry";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTimeLengthClass } from "@/utils/ui";

const RecipeDetailsPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  logEvent("Viewing recipe details", "recipe", { recipeId: recipe.id }, "info");

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow border border-gray-200 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">{recipe.name}</h1>

        <div className="text-gray-700">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p>{recipe.description}</p>
        </div>

        <div className="text-gray-700">
          <h2 className="text-lg font-semibold mb-2">Time Length</h2>
          <p className={getTimeLengthClass(recipe.timeLength)}>
            {recipe.timeLength}
          </p>
        </div>

        <div className="text-gray-700">
          <h2 className="text-lg font-semibold mb-2">Created at</h2>
          <p>{new Date(recipe.createdAt).toLocaleString()}</p>
        </div>

        <Link
          href="/recipes"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Back to Recipes
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
