import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabase";
import { Participant } from "~/types/Player";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUsers = async (userIds: string[]) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .in("id", userIds);

    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }

    console.log("participants:", data);

    return data as Participant[];
  } catch (error) {
    console.log("Something went wrong...", error);
  }
};
