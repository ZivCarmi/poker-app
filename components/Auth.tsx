import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/auth-context";
import { supabase } from "~/lib/supabase";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) throw error;

  return data.session;
};

const signIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        prompt: "select_account",
      },
      redirectTo: redirectUri,
      skipBrowserRedirect: true,
      scopes: "openid profile email",
    },
  });

  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectUri
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut({ scope: "local" }); //  sometimes work sometimes not, need to figure out

  if (error) {
    console.error("Error signing out:", error);
  } else {
    console.log("User signed out successfully");
    // Optionally, navigate the user to the sign-in screen or update the UI
  }
};

export default function Auth() {
  const { user, loading } = useAuth();
  const { replace } = useRouter();

  if (loading) return <Text>Loading...</Text>;

  if (user) {
    return (
      <Button onPress={signOut} className="bg-blue-500">
        <Text>Sign out</Text>
      </Button>
    );
  }

  return (
    <Button
      onPress={async () => {
        await signIn();
        replace("./");
      }}
      className="bg-blue-500"
    >
      <Text>Sign in with Google</Text>
    </Button>
  );
}
