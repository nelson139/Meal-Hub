"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createRecipe } from "@/actions/recipe.actions";
import { toast } from "sonner";

const NewRecipeForm = () => {
  const [state, formAction] = useActionState(createRecipe, {
    success: false,
    message: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Recipe submitted successfully!");
      router.push("/recipes");
    }
  }, [state.success, router]);

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Submit a Recipe
      </h1>
      {state.message && !state.success && (
        <p className="text-red-500 mb-4 text-center">{state.message}</p>
      )}
      <form action={formAction} className="space-y-4 text-gray-700">
        <input
          className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="off"
        ></input>
        <input
          className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          name="description"
          placeholder="Description"
          autoComplete="off"
        ></input>
        <textarea
          className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="ingredients"
          placeholder="List the ingredients needed to make this dish"
          rows={4}
        ></textarea>
        <textarea
          className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="instructions"
          placeholder="Describe the steps to make this dish"
          rows={4}
        ></textarea>
        <select
          className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          name="timeLength"
          defaultValue="30 mins or less"
        >
          <option value="short"> {">"} 30 minutes</option>
          <option value="medium">{">"} 1 hour</option>
          <option value="long">{">"} 2 hours</option>
        </select>
        <button
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewRecipeForm;
