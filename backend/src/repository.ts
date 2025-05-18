import { User } from "./types";

class UserRepository {
  private users: User[] = [];

  create(user: User) {
    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  find(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, nextUser: User) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return;

    this.users[index] = nextUser;

    return this.users;
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export const userRepository = new UserRepository();
