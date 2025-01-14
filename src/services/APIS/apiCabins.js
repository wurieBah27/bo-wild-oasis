import supabase from "../supabase/supabase";

/* supabaseURL */
const supabaseURL = "https://ixeicjnfrkivjsralcjh.supabase.co";

async function splitImageUrl(imageUrl) {
  // Check if the URL is valid (optional)
  if (!imageUrl || !imageUrl.startsWith("https://")) {
    return null; // Return null for invalid URLs
  }

  const parts = await imageUrl.split("/");

  const fileName = parts[parts.length - 1];

  if (fileName === -1) {
    return null; // Return null if "public/" is not found
  }

  return fileName;
}

// Example usage

// Example usage

/* Simple error checking function that takes in argumemets */
function checkError(error, message) {
  if (error) {
    console.error(`${message}`);
    throw new Error(`${message}`);
  }
}

/* Suapabase function to get all the data in the CABINS */
export const getCabins = async () => {
  const { data, error } = await supabase.from("Cabins").select("*");

  const errorMessage = `Cabins could not be fetched, please try again.`;
  checkError(error, errorMessage);

  return data;
};

/* Supabase function to delete a single column in the Database */

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);

  const errorMessage = `Cabins could not be Deleted, please try again.`;
  checkError(error, errorMessage);

  return data;
};

/* Creating new cabins / rows in supabase */

export const create_Edit_Cabin = async (newCabinObj, id, supaIm) => {
  /* check if image path is equal to supabaseURl */

  const hasImagePath = newCabinObj?.image?.startsWith?.(supabaseURL);
  console.log(typeof newCabinObj?.image);

  const imageName = `${Date.now().toString()}-${
    newCabinObj?.image?.name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabinObj?.image
    : `${supabaseURL}/storage/v1/object/public/Cabins_images/${imageName}`;

  console.log(imagePath);
  if (!id) {
    const { data, error } = await supabase
      .from("Cabins")
      .insert([{ ...newCabinObj, image: imagePath }])
      .select()
      .single();

    const { data: imagaData, error: imageError } = supabase.storage
      .from("Cabins_images")
      .upload(imageName, newCabinObj.image);

    if (imageError) {
      await supabase.from("Cabins").delete().eq("id", data.id);

      const errorMessage = `Error in uploading cabin image, so the cabin wasn't created. Please try again. `;
      checkError(imageError, errorMessage);
    } else {
      console.log(imagaData);
    }

    const errorMessage = `Cabins could not be created, please try again!`;
    checkError(error, errorMessage);
    return data;
  }

  if (id) {
    const { data, error } = await supabase
      .from("Cabins")
      .update({ ...newCabinObj, image: imagePath })
      .eq("id", id)
      .select();

    // Example usage

    if (typeof newCabinObj?.image === "object") {
      const imageUrl = supaIm;
      const splittedUrl = await splitImageUrl(imageUrl);

      const { error: imageError } = supabase.storage
        .from("Cabins_images")
        .remove([splittedUrl]);

      await supabase.storage
        .from("Cabins_images")
        .upload(imageName, newCabinObj.image);

      if (imageError) {
        await supabase.from("Cabins").delete().eq("id", data.id);

        const errorMessage = `Error in uploading cabin image, so the cabin wasn't created. Please try again. `;
        checkError(imageError, errorMessage);
      }
    }

    const errorMessage = `Cabins could not be updated, please try again!`;
    checkError(error, errorMessage);
    return data;
  }

  return null;
};
