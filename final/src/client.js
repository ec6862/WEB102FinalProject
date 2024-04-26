import { createClient } from "@supabase/supabase-js";

const URL = "https://cwnmoreorsxelagdvmwp.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bm1vcmVvcnN4ZWxhZ2R2bXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzODU1NDksImV4cCI6MjAyODk2MTU0OX0._AgVPrFxiU_iq8TP_Za5s5e0jvslVECAwbQ32qvZExQ"

export const supabase = createClient(URL, API_KEY);