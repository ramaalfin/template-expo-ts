export const formatTime = (time: any) => {
  const date = new Date(time);
  const formattedHours = String(date.getHours()).padStart(2, "0");
  const formattedMinutes = String(date.getMinutes()).padStart(2, "0");
  const formattedSeconds = String(date.getSeconds()).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
