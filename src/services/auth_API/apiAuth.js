import supabase from "../supabase/supabase";

const subaseURL = "https://ixeicjnfrkivjsralcjh.supabase.co";
/* log in the users/employee */
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(
      `${error.message}, please try login in with your correct email and password`
    );
  }
  return data;
}

/*get the details from locale storage if the user has logged in already  */
export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(
      `${error.message}, please try login in with your correct email and password`
    );
  }
  return data?.user;
};

/* logout from the database */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(
      `${error.message}, please try login in with your correct email and password`
    );
  }
};

/* create a new user/employee in the database */
export const createUser = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar_url: "",
      },
    },
  });

  if (error) {
    throw new Error(
      `${error.message}, please try login in with your correct email and password`
    );
  }
  return data;
};

export const updateCurrentUser = async ({
  password,
  full_name,
  avatar_url,
}) => {
  // 1. Update password or full_name
  let updateData = {};

  if (password) updateData.password = password;
  if (full_name) updateData.data = { full_name }; // Ensure data is an object

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(`${error.message}`);
  console.log(password);

  console.log(data);

  if (!avatar_url) {
    console.log("no avatar");
  }
  if (!avatar_url) return data;

  // 2. Upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // const avatarFile = event.target.files[0]
  const { error: storageError } = await supabase.storage
    .from("Avatars")
    .upload(fileName, avatar_url);

  // const { error: storageError } = await supabase.storage
  //   .from("Avatars")
  //   .upload(fileName, avatar_url);

  if (storageError) throw new Error(`${error.message}`);

  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar_url: `${subaseURL}/storage/v1/object/public/Avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(`${error.message}`);

  return updateUser;
};
