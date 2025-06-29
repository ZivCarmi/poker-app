import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import useCreateGroup from "~/hooks/useCreateGroup";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Text } from "./ui/text";

const newGroupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Group name must be at least 1 character long" })
    .max(60, { message: "Group name must be at most 60 characters" }),
});

export type GroupData = z.infer<typeof newGroupSchema>;

const NewGroupForm = () => {
  const { mutate } = useCreateGroup();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupData>({
    defaultValues: { name: "" },
    resolver: zodResolver(newGroupSchema),
  });

  const onSubmit: SubmitHandler<GroupData> = async (data) => {
    console.log("Form submitted with data:", data);
    mutate(data);
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
        {errors.name && (
          <Text className="pt-1 text-destructive">{errors.name.message}</Text>
        )}
      </View>

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Create</Text>
      </Button>
    </View>
  );
};

export default NewGroupForm;
