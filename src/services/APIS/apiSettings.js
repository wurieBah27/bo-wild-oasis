import supabase from "../supabase/supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("Settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

/* 
const { data, error } = await supabase
  .from('Settings')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')
  .select()
           */

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  console.log(newSetting);
  const { data, error } = await supabase
    .from("Settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
