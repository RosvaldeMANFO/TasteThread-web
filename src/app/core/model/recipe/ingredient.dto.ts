export class IngredientDTO {
  id?: string;
  name: string = "";
  quantity: number = 0;
  unit?: string;

  constructor(data?: Partial<IngredientDTO>) {
    Object.assign(this, data);
  }

  static fromJSON(json: any): IngredientDTO {
    if (!json) return new IngredientDTO();
    return new IngredientDTO({
      id: json.id,
      name: json.name,
      quantity: json.quantity,
      unit: json.unit,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
    };
  }

  toString(): string {
    return `${this.quantity} ${this.unit ?? ''} ${this.name}`.trim();
  }
}