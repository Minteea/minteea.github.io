import dayjs from "dayjs";

export default function FormattedDate({
  date,
  format,
}: {
  date: Date | string | number;
  format: string;
}) {
  return <span>{dayjs(date).format(format)}</span>;
}
