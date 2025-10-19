export enum Unit {
  GRAM = 'g',
  KILOGRAM = 'kg',
  MILLILITER = 'ml',
  LITER = 'l',
  TEASPOON = 'tsp',
  TABLESPOON = 'tbsp',
  CUP = 'c',
  PINCH = 'pinch',
  PIECE = 'pc',
}

export const UNIT_OPTIONS: { value: Unit; label: string }[] = [
  { value: Unit.GRAM, label: 'g' },
  { value: Unit.KILOGRAM, label: 'kg' },
  { value: Unit.MILLILITER, label: 'ml' },
  { value: Unit.LITER, label: 'l' },
  { value: Unit.TEASPOON, label: 'tsp' },
  { value: Unit.TABLESPOON, label: 'tbsp' },
  { value: Unit.CUP, label: 'c' },
  { value: Unit.PINCH, label: 'pinch' },
  { value: Unit.PIECE, label: 'pc' },
];