declare namespace App {
  interface User {
    displayName: string;
    email: string;
  }
}

declare namespace App.User {
  interface State {
    user?: User;
    loginProcessing: boolean;
  }

  interface AwareState {
    user: State;
  }

  interface LoginPayload {
    username: string;
    password: string;
  }
}
