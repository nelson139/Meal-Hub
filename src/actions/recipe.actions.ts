"use server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { logEvent } from "@/utils/sentry";
import { getCurrentUser } from "@/lib/current-user";

export async function createRecipe(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      logEvent("Unauthorized ticket creation attempt", "ticket", {}, "warning");

      return {
        success: false,
        message: "You must be logged in to create a ticket",
      };
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;
    const timeLength = formData.get("timeLength") as string;

    if (!name || !description || !ingredients || !instructions || !timeLength) {
      logEvent(
        "Validation Error: Missing fields",
        "recipe",
        { name, description, ingredients, instructions, timeLength },
        "warning"
      );
      return { success: false, message: "All fields are required" };
    }

    // create recipe
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        ingredients,
        instructions,
        timeLength,
        user: { connect: { id: user.id } },
      },
    });

    Sentry.addBreadcrumb({
      category: "recipe",
      message: `Recipe created: ${recipe.id}`,
      level: "info",
    });

    logEvent(
      `Recipe created successfully: ${recipe.id}`,
      "recipe",
      { recipeId: recipe.id },
      "info"
    );

    revalidatePath("/recipes");

    return { success: true, message: "Recipe created succesfully" };
  } catch (error) {
    logEvent(
      "An error occured while creating the recipe",
      "recipe",
      { formData: Object.fromEntries(formData.entries()) },
      "error",
      error
    );
    return {
      success: false,
      message: "An error occured while creating the ticket",
    };
  }
}

export async function getRecipes() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      logEvent("Unauthorized access to ticket list", "ticket", {}, "warning");
      return [];
    }

    const recipes = await prisma.recipe.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    logEvent(
      "Fetched recipe list",
      "recipe",
      { count: recipes.length },
      "info"
    );

    return recipes;
  } catch (error) {
    logEvent("Error fetching tickets", "ticket", {}, "error", error);

    return [];
  }
}

export async function getRecipeById(id: string) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) },
    });

    if (!recipe) {
      logEvent("Recipe not found", "recipe", { recipeId: id }, "warning");
    }

    return recipe;
  } catch (error) {
    logEvent(
      "Error fetching recipe details",
      "recipe",
      { recipeId: id },
      "error",
      error
    );

    return null;
  }
}
