import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hoekgemrrololosffmgd.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZWtnZW1ycm9sb2xvc2ZmbWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcxNjksImV4cCI6MjA1MjQyMzE2OX0.EWOFH8DLT_ZzsKwx8MdKPNyMK6yH79TewWO-zEajU7c";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;