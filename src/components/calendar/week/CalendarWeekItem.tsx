interface CalendarWeekItemProps {
  date: Date;
  data: {
    type: string;
    time: string;
    title: string;
  }[];
}

export default function CalendarWeekItem({
  date,
  data,
}: CalendarWeekItemProps) {
  return (
    <div class="bg-white py-1 px-2">
      <div>{date.getDate()}</div>
      <div>{data[0].title}</div>
    </div>
  );
}
