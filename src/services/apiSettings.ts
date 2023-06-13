import supabase from "./supabase";

export interface TSettings {
  minBookingLength: number;
  maxBookingLength: number;
  maxNumberOfGuests: number;
  breakfastPrice: number;
}

export const getSettings = async () => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
};

// We expect a newSetting object that looks like {setting: newValue}
export const updateSetting = async (settings: TSettings) => {
  const { data, error } = await supabase
    .from("settings")
    .update(settings)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
};
