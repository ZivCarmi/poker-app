import { useState } from "react";
import { Pressable, ScrollView, useWindowDimensions } from "react-native";
import { CalendarPlus } from "~/lib/icons/CalendarPlus";
import NewMeetingForm from "./NewMeetingForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Text } from "./ui/text";

const NewMeetingButton = () => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pressable onPress={() => setOpen(true)}>
          <CalendarPlus className="text-foreground" />
        </Pressable>
      </DialogTrigger>
      <DialogContent style={{ width: width - 40 }}>
        <ScrollView>
          <DialogHeader>
            <DialogTitle>
              <Text>Create new event</Text>
            </DialogTitle>
          </DialogHeader>
          <NewMeetingForm onDialogClose={() => setOpen(false)} />
        </ScrollView>
      </DialogContent>
    </Dialog>
  );
};

export default NewMeetingButton;
