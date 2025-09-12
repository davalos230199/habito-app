import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zuumuzpeuuvsyekyqriy.supabase.co' // La encuentras en Settings > API
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1dW11enBldXV2c3lla3lxcml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MTg5ODQsImV4cCI6MjA3MzE5NDk4NH0.QDvzMiVYW7SgHcdtRA0_1uVA3c9okJIIFhRp0er2y78' // La encuentras en Settings > API

export const supabase = createClient(supabaseUrl, supabaseAnonKey)