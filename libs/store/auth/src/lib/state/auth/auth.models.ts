export interface FetchSignInMethodsForEmailArgs {
  body: {
    email: string;
  };
}

export interface SendPasswordResetEmailArgs {
  body: {
    email: string;
  };
}

export interface SignInWithEmailAndPasswordArgs {
  body: {
    email: string;
    password: string;
  };
}

export interface CreateUserWithEmailAndPasswordArgs {
  body: {
    email: string;
    password: string;
  };
}

export interface GetUserIdTokenArgs {
  body: {
    forceRefresh: boolean;
  };
}

export interface UpdateUserEmailArgs {
  body: {
    email: string;
  };
}

export interface UpdateUserPasswordArgs {
  body: {
    password: string;
  };
}
