import { localStorage } from '@/utils/storage';
import { reactive, readonly } from 'vue';

export abstract class Store<T extends Record<string, any>> {
  protected state!: T;

  constructor() {
    const data = this.data();
    this.setup(data);
    this.state = reactive(data) as T;
  }

  protected abstract data(): T;

  protected setup(data: T): void {
    data;
  }

  public getState(): T {
    return readonly(this.state) as T;
  }
}

interface UserData {
  token: string;
  user_id: string;
  user_face: string;
}

class UserStore extends Store<UserData> {
  protected data(): UserData {
    const token: UserData = localStorage.getItem('token') || { token: '', user_id: '', user_face: '' };
    return token;
  }

  setToken(data: UserData) {
    this.state.token = data.token;
    this.state.user_id = data.user_id;
    this.state.user_face = data.user_face;
    localStorage.setItem('token', data);
  }

  reamoveToken() {
    this.state.token = '';
    this.state.user_id = '';
    this.state.user_face = '';
    localStorage.removeItem('token');
  }
}

export default new UserStore();
