export interface PostSignInMethodsForEmailArgs {
  body: {
    email: string;
  };
}

export interface PostSignInArgs {
  body: {
    email: string;
    password: string;
  };
}
