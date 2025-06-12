import { auth } from "./supabaseClient";

export async function signUp(email: string, username: string, password: string): Promise<string | null>{
    const { error } = await auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              username:username
            }
          }
        }
      );

    return error?.message ?? null;
}

export async function signIn(email: string, password: string): Promise<string| null> {
    const { error } = await auth.signInWithPassword({
        email: email,
        password: password
    });

    return error?.message ?? null;
}

export async function signOut() {
    console.log((await auth.getUser()))
    await auth.signOut();
}