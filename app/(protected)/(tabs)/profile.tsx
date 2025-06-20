import { View } from "react-native";
import Auth from "~/components/Auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/auth-context";

const Profile = () => {
  const { user } = useAuth();

  const getFirstLetters = (str: string) => {
    const matches = str.match(/\b(\w)/g);
    const acronym = matches?.join("");
    return acronym;
  };

  return (
    <View className="px-4 gap-4">
      <View className="flex-row items-center gap-4">
        <Avatar
          className="w-20 h-20"
          alt={`${user?.user_metadata.full_name}'s Avatar`}
        >
          <AvatarImage source={{ uri: user?.user_metadata.avatar_url }} />
          <AvatarFallback>
            <Text>{getFirstLetters(user?.user_metadata.full_name)}</Text>
          </AvatarFallback>
        </Avatar>
        <Text className="text-2xl">{user?.user_metadata.full_name}</Text>
      </View>
      <Auth />
    </View>
  );
};

export default Profile;
