export function cn(...className: string[]) {
  return className.join(' ')
}

export function getTimeLeft(targetDate: Date, startDate: Date) {
  const now = new Date()

  // Если событие еще не началось
  if (now < startDate) {
    const differenceToStart = startDate.getTime() - now.getTime()
    const hoursUntilStart = Math.floor(differenceToStart / (1000 * 60 * 60))
    const minutesUntilStart = Math.floor((differenceToStart % (1000 * 60 * 60)) / (1000 * 60))

    if (hoursUntilStart > 0) {
      return `Will open in ${hoursUntilStart} hour${hoursUntilStart > 1 ? 's' : ''}`
    } else {
      return `Will open in ${minutesUntilStart} minute${minutesUntilStart > 1 ? 's' : ''}`
    }
  }

  // Расчет времени до конца события
  const difference = targetDate.getTime() - now.getTime()

  if (difference <= 0) {
    return 'Time is up!'
  }

  const hoursLeft = Math.floor(difference / (1000 * 60 * 60))
  const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

  if (hoursLeft > 0) {
    return `${hoursLeft} hour${hoursLeft > 1 ? 's' : ''} left`
  } else {
    return `${minutesLeft} minute${minutesLeft > 1 ? 's' : ''} left`
  }
}

export function formatDate(date: Date): string {
  const padToTwoDigits = (num: number): string => num.toString().padStart(2, '0')

  const hours = padToTwoDigits(date.getHours())
  const minutes = padToTwoDigits(date.getMinutes())
  const day = padToTwoDigits(date.getDate())
  const month = padToTwoDigits(date.getMonth() + 1)
  const year = date.getFullYear()

  return `${hours}:${minutes} / ${day}.${month}.${year}`
}
