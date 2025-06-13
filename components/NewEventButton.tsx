import { useWindowDimensions } from "react-native";
import NewEventForm from "./NewEventForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Text } from "./ui/text";

const NewEventButton = () => {
  const { width } = useWindowDimensions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Text>Create new event</Text>
        </Button>
      </DialogTrigger>
      <DialogContent style={{ width: width - 40 }}>
        <DialogHeader>
          <DialogTitle>Create new event</DialogTitle>
        </DialogHeader>
        <NewEventForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewEventButton;
