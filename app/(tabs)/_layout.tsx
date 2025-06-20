import ThemeTabs from "~/components/ThemeTabs";
import { MeetingProvider } from "~/context/meeting-context";

const TabsLayout = () => {
  return (
    <MeetingProvider>
      <ThemeTabs />
    </MeetingProvider>
  );
};

export default TabsLayout;
