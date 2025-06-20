import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { SquarePlus } from "~/lib/icons/SquarePlus";

const NewGroupButton = () => {
  return (
    <Link href="/new-group" asChild>
      <Pressable className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:opacity-70">
        <View className="flex-1 aspect-square pt-0.5 justify-center items-start web:px-4">
          <SquarePlus className="text-foreground" size={24} />
        </View>
      </Pressable>
    </Link>
  );
};

export default NewGroupButton;
