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

const pokerEventSchema = z.object({
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  location: z.string().optional(),
});

type EventSchemaType = z.infer<typeof pokerEventSchema>;

const NewEventForm = () => {
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
    resolver: zodResolver(pokerEventSchema),
  });

  const showPickers = () => {
    setShowDatePicker(true);
  };

  const onSubmit: SubmitHandler<EventSchemaType> = (data) => {
    console.log("Form submitted with data:", data);
    // Here you can handle the form submission, e.g., send data to an API
    // Reset the form or navigate to another screen if needed
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

export default NewEventForm;
