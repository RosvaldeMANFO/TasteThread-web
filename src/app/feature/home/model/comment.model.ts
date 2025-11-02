export class Comment {
  author: string = '';
  content: string = '';
  createdAt: string = '';

  constructor(data?: Partial<Comment>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static fromJSON(json: any): Comment {
    return new Comment({
      author: json.author,
      content: json.content,
      createdAt: json.createdAt,
    });
  }

  toJSON() {
    return {
      author: this.author,
      content: this.content,
      createdAt: this.createdAt,
    };
  }
}