import { useWindowDimensions } from "react-native";
import NewMeetingForm from "./NewMeetingForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Text } from "./ui/text";
import { useState } from "react";

const NewMeetingButton = () => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Text>Create new event</Text>
        </Button>
      </DialogTrigger>
      <DialogContent style={{ width: width - 40 }}>
        <DialogHeader>
          <DialogTitle>Create new event</DialogTitle>
        </DialogHeader>
        <NewMeetingForm onDialogClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default NewMeetingButton;
