const requiredEnv = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
};

function assertEnv(name: keyof typeof requiredEnv, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}. Did you configure your .env file?`);
  }

  return value;
}

export const env = Object.freeze({
  supabaseUrl: assertEnv('VITE_SUPABASE_URL', requiredEnv.VITE_SUPABASE_URL),
  supabaseAnonKey: assertEnv('VITE_SUPABASE_ANON_KEY', requiredEnv.VITE_SUPABASE_ANON_KEY),
});
