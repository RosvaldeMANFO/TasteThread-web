import { UserRole } from "./userRole.model";

export class UserModel {
  id: string = '';
  name: string = '';
  password: string = '';
  email: string = '';
  imageUrl?: string | null = null;
  role: UserRole = UserRole.USER;
  activated: boolean = false;
  createdAt: number = 0;
  updatedAt: number = 0;

  constructor(data?: Partial<UserModel>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static fromJSON(json: any): UserModel {
    return new UserModel({
      id: json.id,
      name: json.name,
      password: json.password,
      email: json.email,
      imageUrl: json.imageUrl ?? null,
      role: json.role as UserRole,
      activated: json.activated ?? false,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      password: this.password,
      email: this.email,
      imageUrl: this.imageUrl,
      role: this.role,
      activated: this.activated,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

