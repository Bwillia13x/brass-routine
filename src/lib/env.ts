const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

const missingEnvVars = [
  !supabaseUrl ? 'VITE_SUPABASE_URL' : null,
  !supabaseAnonKey ? 'VITE_SUPABASE_PUBLISHABLE_KEY' : null,
].filter(Boolean) as string[];

if (missingEnvVars.length > 0) {
  const message = `Missing Supabase environment variables: ${missingEnvVars.join(', ')}. Supabase-powered features are disabled until these values are provided.`;

  if (import.meta.env.DEV) {
    console.warn(message);
  } else {
    console.error(message);
  }
}

export const env = Object.freeze({
  supabase: supabaseUrl && supabaseAnonKey
    ? { url: supabaseUrl, anonKey: supabaseAnonKey }
    : null,
});
