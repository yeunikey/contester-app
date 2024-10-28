
export function cn(...className: string[]) {
  return className.join(" ");
}

export function getTimeLeft(targetDate: Date) {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return "Time is up!";
  }

  const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
  const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  if (hoursLeft > 0) {
    return `${hoursLeft} hour${hoursLeft > 1 ? 's' : ''} left`;
  } else {
    return `${minutesLeft} minute${minutesLeft > 1 ? 's' : ''} left`;
  }
}

export function formatDate(date: Date): string {
  const padToTwoDigits = (num: number): string => num.toString().padStart(2, '0');

  const hours = padToTwoDigits(date.getHours());
  const minutes = padToTwoDigits(date.getMinutes());
  const day = padToTwoDigits(date.getDate());
  const month = padToTwoDigits(date.getMonth() + 1); // Месяцы начинаются с 0
  const year = date.getFullYear();

  return `${hours}:${minutes} / ${day}.${month}.${year}`;
}
