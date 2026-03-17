type ReminderCardProps = {
  id: string | number;
  type: "Activity" | "Medicine" | "Appointment";
  title: string;
  date: string;
  closeIcon?: boolean;
  refetchAllReminders: (...args: any) => any;
};

export const _Reminders: ReminderCardProps[] = [
  {
    id: 1,
    type: "Activity",
    title: "Play time",
    date: "now",
    closeIcon: true,
    refetchAllReminders: () => {},
  },
  {
    id: 2,
    type: "Appointment",
    title: "Doctor meeting",
    date: "now",
    closeIcon: true,
    refetchAllReminders: () => {},
  },
  {
    id: 3,
    type: "Medicine",
    title: "Pills time",
    date: "now",
    closeIcon: true,
    refetchAllReminders: () => {},
  },
  //   {
  //     id: 4,
  //     type: "Activity",
  //     title: "Sports",
  //     date: "now",
  //     closeIcon: true,
  //     refetchAllReminders: () => {},
  //   },
];
