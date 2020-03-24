export function formatTime(time: number) {
  let result = "";
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  if (days) {
    result += days + "d ";
  }
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (hours) {
    result += hours + "h ";
  }
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes) {
    result += minutes + "m ";
  }
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  if (seconds) {
    result += seconds + "s ";
  }
  const ms = time % 1000;

  if (ms) {
    result += ms + "ms ";
  }

  if (!result) {
    result = "0s";
  }
  return result;
}
