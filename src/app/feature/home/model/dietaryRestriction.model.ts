export enum DietaryRestriction {
  DAIRY_FREE = 'Dairy Free',
  GLUTEN_FREE = 'Gluten Free',
  NONE = 'None',
  NUT_FREE = 'Nut Free',
  VEGAN = 'Vegan',
  VEGETARIAN = 'Vegetarian',
}

export const DIETARY_RESTRICTION_OPTIONS: { value: DietaryRestriction; label: string }[] =
  Object.values(DietaryRestriction).map(v => ({ value: v as DietaryRestriction, label: v }));