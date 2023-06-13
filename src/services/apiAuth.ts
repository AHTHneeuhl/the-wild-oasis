import { UserAttributes } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

export interface TSignUp {
  email: string;
  password: string;
  fullName: string;
}

export interface TSignIn {
  email: string;
  password: string;
}

export interface TUpdateUser {
  avatar?: string;
  password?: string;
  fullName?: string;
}

export const signUp = async ({ email, password, fullName }: TSignUp) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error?.message);

  return data;
};

export const signIn = async ({ email, password }: TSignIn) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({
  password,
  fullName,
  avatar,
}: TUpdateUser) => {
  const updateData = {} as UserAttributes;
  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);

  return updatedUser;
};
