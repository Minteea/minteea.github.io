import CalendarWeekItem from "./CalendarWeekItem";

interface CalendarWeekProps {
  weekData: {
    date: Date;
    data: {
      type: string;
      time: string;
      title: string;
    }[];
  }[];
}

export default function CalendarWeek({ weekData }: CalendarWeekProps) {
  return (
    <div>
      {weekData.map((d) => (
        <CalendarWeekItem date={d.date} data={d.data} />
      ))}
    </div>
  );
}
