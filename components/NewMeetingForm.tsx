import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, View } from "react-native";
import { z } from "zod";
import { useAuth } from "~/context/auth-context";
import useCreateMeeting from "~/hooks/useCreateMeeting";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Text } from "./ui/text";

const meetingSchema = z.object({
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  location: z.string().trim().optional(),
});

type MeetingData = z.infer<typeof meetingSchema>;

export type MeetingDataWithGroupIdAndCreatedBy = MeetingData & {
  groupId: string;
  createdBy: string;
};

type NewMeetingFormProps = {
  onDialogClose: () => void;
};

const NewMeetingForm = ({ onDialogClose }: NewMeetingFormProps) => {
  const { mutate } = useCreateMeeting();
  const { user } = useAuth();
  const global = useGlobalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MeetingData>({
    defaultValues: { date: new Date() },
    resolver: zodResolver(meetingSchema),
  });

  const showPickers = () => {
    setShowDatePicker(true);
  };

  const onSubmit: SubmitHandler<MeetingData> = async (data) => {
    console.log("Form submitted with data:", data);

    if (!user) {
      console.error("Unauthorized user");
      return;
    }

    // Check for existence of groupId
    if (!global.groupId || typeof global.groupId !== "string") {
      console.error("Unrecognized group");
      return;
    }

    const { title, description, location, date } = data;

    const newMeetingData: MeetingDataWithGroupIdAndCreatedBy = {
      title,
      description,
      date,
      location,
      createdBy: user.id,
      groupId: global.groupId as string,
    };

    mutate(newMeetingData);
    onDialogClose();
  };

  return (
    <View className="gap-4">
      <View>
        <Label className="mb-2" nativeID="title">
          Title
        </Label>
        <Controller
          control={control}
          rules={{ maxLength: 100 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              aria-labelledby="title"
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
      </View>

      <View>
        <Label className="mb-2" nativeID="description">
          Description
        </Label>
        <Controller
          control={control}
          rules={{ maxLength: 100 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              aria-labelledby="description"
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
      </View>

      <View>
        <Label className="mb-2" nativeID="location">
          Location
        </Label>
        <Controller
          control={control}
          rules={{ maxLength: 100 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              aria-labelledby="location"
              placeholder="Location"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="location"
        />
      </View>

      <SafeAreaView>
        <Label className="mb-2" nativeID="date">
          Date & Time
        </Label>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <>
              <Button variant="outline" onPress={showPickers}>
                <Text>
                  {value
                    ? value.toLocaleString("he-IL", {
                        dateStyle: "short",
                        timeStyle: "short",
                        timeZone: "Asia/Jerusalem",
                      })
                    : "Select Date & Time"}
                </Text>
              </Button>

              {showDatePicker && (
                <DateTimePicker
                  aria-labelledby="date"
                  value={new Date()}
                  mode="date"
                  minimumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setTempDate(selectedDate);
                      setShowTimePicker(true);
                    }
                  }}
                />
              )}

              {showTimePicker && (
                <DateTimePicker
                  value={tempDate || new Date()}
                  mode="time"
                  is24Hour={true}
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime && tempDate) {
                      // מאחדים את התאריך והשעה לאובייקט Date אחד
                      const combinedDate = new Date(tempDate);
                      combinedDate.setHours(selectedTime.getHours());
                      combinedDate.setMinutes(selectedTime.getMinutes());
                      combinedDate.setSeconds(0);
                      combinedDate.setMilliseconds(0);
                      onChange(combinedDate);
                    }
                  }}
                />
              )}
            </>
          )}
        />
      </SafeAreaView>
      {errors.date && <Text>This is required.</Text>}

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Create</Text>
      </Button>
    </View>
  );
};

export default NewMeetingForm;
