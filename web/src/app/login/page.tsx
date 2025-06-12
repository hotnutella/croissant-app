'use client';
import { supabase } from '../../supabaseClient';

export default function Login() {
  const signIn = async (provider: 'google' | 'github' | 'apple') => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  const signInAnon = async () => {
    await supabase.auth.signInAnonymously();
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => signIn('google')}>Sign in with Google</button>
      <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={() => signIn('github')}>Sign in with GitHub</button>
      <button className="bg-black text-white px-4 py-2 rounded" onClick={() => signIn('apple')}>Sign in with Apple</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={signInAnon}>Continue as Guest</button>
    </div>
  );
}
