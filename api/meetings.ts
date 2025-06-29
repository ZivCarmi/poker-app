import { CheckInMeetingData } from "~/components/Meetings";
import { MeetingDataWithGroupIdAndCreatedBy } from "~/components/NewMeetingForm";
import { supabase } from "~/lib/supabase";

export const createMeeting = async (
  meetingData: MeetingDataWithGroupIdAndCreatedBy
) => {
  const { title, description, location, createdBy, date, groupId } =
    meetingData;

  const { data, error } = await supabase
    .from("meetings")
    .insert([
      {
        title,
        description,
        location,
        date,
        group_id: groupId,
        created_by: createdBy,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteMeeting = async (meetingId: string) => {
  const { data, error } = await supabase
    .from("meetings")
    .delete()
    .eq("id", meetingId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchMeetingParticipants = async (meetingId: string) => {
  const { data, error } = await supabase
    .from("meeting_participants")
    .select(
      `
      user_id,
      ...users (
        avatar_url,
        username
      )
      `
    )
    .eq("meeting_id", meetingId);

  if (error) throw new Error(error.message);

  return data;
};

export const checkInMeeting = async (checkInData: CheckInMeetingData) => {
  const { userId, meetingId } = checkInData;

  const { data, error } = await supabase
    .from("meeting_participants")
    .insert([{ user_id: userId, meeting_id: meetingId }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const checkOutMeeting = async (checkOutData: CheckInMeetingData) => {
  const { userId, meetingId } = checkOutData;

  const { data, error } = await supabase
    .from("meeting_participants")
    .delete()
    .eq("user_id", userId)
    .eq("meeting_id", meetingId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
