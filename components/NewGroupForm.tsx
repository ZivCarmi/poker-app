import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import { BASE_URL } from "~/api/config";
import { useAuth } from "~/context/auth-context";
import { Group } from "~/types/Group";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Text } from "./ui/text";

const newGroupSchema = z.object({
  name: z.string(),
});

type EventSchemaType = z.infer<typeof newGroupSchema>;

const NewGroupForm = () => {
  const { token } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchemaType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(newGroupSchema),
  });

  const onSubmit: SubmitHandler<EventSchemaType> = async (data) => {
    const { name } = data;

    const newGroupData: Partial<Group> = { name };

    console.log("Form submitted with data:", data);

    try {
      const response = await fetch(`${BASE_URL}/groups/new`, {
        body: JSON.stringify(newGroupData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const resJson = await response.json();

      console.log("todo");
    } catch (error: any) {
      console.log(error);

      throw new Error(error.message || "Request failed...");
    }
  };

  return (
    <View className="pt-4 gap-4">
      <View>
        <Controller
          control={control}
          rules={{ maxLength: 100 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Group name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Create</Text>
      </Button>
    </View>
  );
};

export default NewGroupForm;
