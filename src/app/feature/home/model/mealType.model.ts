export enum MealType {
  APPETIZER = 'Appetizer',
  BEVERAGE = 'Beverage',
  BREAKFAST = 'Breakfast',
  BRUNCH = 'Brunch',
  DESSERT = 'Dessert',
  DINNER = 'Dinner',
  LUNCH = 'Lunch',
  MAIN_COURSE = 'Main Course',
  SALAD = 'Salad',
  SIDE_DISH = 'Side Dish',
  SNACK = 'Snack',
  SOUP = 'Soup',
  UNKNOWN = 'Unknown',
}

export const MEAL_TYPE_OPTIONS: { value: MealType; label: string }[] = Object.values(MealType).map(v => ({ value: v as MealType, label: v }));