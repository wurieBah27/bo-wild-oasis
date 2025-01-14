import { createClient } from "@supabase/supabase-js";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZWljam5mcmtpdmpzcmFsY2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDc5MjAsImV4cCI6MjA0ODg4MzkyMH0.fkzhPeMk9ehr7Ge3qM-YVDR72YSz-HOkZBj4UOwQEBA";
// Create a single supabase client for interacting with your database

const supabaseUrl = "https://ixeicjnfrkivjsralcjh.supabase.co";
const supabaseKey = key;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
