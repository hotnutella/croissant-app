import { View, Button } from 'react-native';
import { supabase } from '../supabaseClient';

export default function LoginScreen() {
  const signIn = async (provider: 'google' | 'github' | 'apple') => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  const signInAnon = async () => {
    await supabase.auth.signInAnonymously();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
      <Button title="Sign in with Google" onPress={() => signIn('google')} />
      <Button title="Sign in with GitHub" onPress={() => signIn('github')} />
      <Button title="Sign in with Apple" onPress={() => signIn('apple')} />
      <Button title="Continue as Guest" onPress={signInAnon} />
    </View>
  );
}
