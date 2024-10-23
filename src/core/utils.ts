
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