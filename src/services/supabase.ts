import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kflrtrlvsffolvrdpady.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmbHJ0cmx2c2Zmb2x2cmRwYWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1NzU1MjQsImV4cCI6MjAwMjE1MTUyNH0.-DcgeueMnixZh-Zux9ttJZhTsHZNHBscys-IxkcDTPw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
