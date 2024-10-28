// eventUtils.ts
export const roundToNext15Minutes = (date: Date): Date => {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 15) * 15;
  const roundedDate = new Date(date);
  roundedDate.setMinutes(roundedMinutes);
  roundedDate.setSeconds(0);
  roundedDate.setMilliseconds(0);
  return roundedDate;
};

export const calculateEndTime = (
  start: Date,
  durationInMinutes: number,
): Date => {
  const end = new Date(start.getTime() + durationInMinutes * 60000);
  return roundToNext15Minutes(end);
};

export const calculateDurationInMinutes = (start: Date, end: Date): number => {
  return (end.getTime() - start.getTime()) / 60000;
};
