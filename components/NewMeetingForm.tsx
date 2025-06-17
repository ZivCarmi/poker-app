import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Text } from "./ui/text";
import { Meeting } from "~/types/Meeting";
import { useAuth } from "~/context/auth-context";
import { BASE_URL } from "~/api/config";
import { useMeeting } from "~/context/meeting-context";

const meetingSchema = z.object({
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  location: z.string().optional(),
});

type EventSchemaType = z.infer<typeof meetingSchema>;

type NewMeetingFormProps = {
  onDialogClose: () => void;
};

const NewMeetingForm = ({ onDialogClose }: NewMeetingFormProps) => {
  const { token } = useAuth();
  const { addNewMeeting } = useMeeting();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchemaType>({
    defaultValues: {
      date: new Date(),
      location: "",
    },
    resolver: zodResolver(meetingSchema),
  });

  const showPickers = () => {
    setShowDatePicker(true);
  };

  const onSubmit: SubmitHandler<EventSchemaType> = async (data) => {
    const { location, date } = data;

    const newMeetingData: Partial<Meeting> = {
      date,
      location,
    };

    console.log("Form submitted with data:", data);

    try {
      const response = await fetch(`${BASE_URL}/meeting/new`, {
        body: JSON.stringify(newMeetingData),
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

      addNewMeeting(resJson.data as Meeting);
      onDialogClose();
    } catch (error: any) {
      throw new Error(error.message || "Request failed...");
    }
  };

  return (
    <View className="gap-4">
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

      <View>
        <Label className="mb-2" nativeID="location">
          Location
        </Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
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

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Create</Text>
      </Button>
    </View>
  );
};

export default NewMeetingForm;
