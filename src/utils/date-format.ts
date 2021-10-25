import dayjs from 'dayjs'

// dayjs不支持直接UTC时间格式化
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  UtcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(UtcString).utcOffset(8).format(format)
}

// export function formatTimestamp(
//   timestamp: number,
//   format: string = DATE_TIME_FORMAT
// ) {
//   return ''
// }
