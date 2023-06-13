import supabase, { supabaseUrl } from "./supabase";

export interface TCabin {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const createCabin = async (cabin: TCabin) => {
  const imageName = `${Math.random()}-${cabin.image}`.replace("/", "");
  const imagePath = `/${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // Create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }]);

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be created");
  }

  // Upload Image
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, cabin.image);

  // Delete the cabin if there was an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError.message);
  }

  return data;
};

export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be deleted");
  }

  return data;
};

export const updateCabin = async (cabin: TCabin) => {
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin })
    .eq("id", cabin.id);

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be updated");
  }

  return data;
};
