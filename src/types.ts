export type Response = {
  success: boolean;
  userId?: string;
  error?: string;
};

export type IngredientList = {
  name: string;
};

export type IconProps = {
    recipeId: number
}
