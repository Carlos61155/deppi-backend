import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL e SUPABASE_SECRET_KEY precisam estar no .env");
}

export const STORAGE_BUCKET_COVER = process.env.SUPABASE_BUCKET_COVER || "cover";
export const STORAGE_BUCKET_DOCS = process.env.SUPABASE_BUCKET_DOCS || "docs";
export const STORAGE_BUCKET_PROFILE = process.env.SUPABASE_BUCKET_PROFILE || "profile";

export const supabase = createClient(supabaseUrl, supabaseKey);