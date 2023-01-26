import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Database } from "../lib/database.types";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);
