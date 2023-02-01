import dayjs from "dayjs"
import 'dayjs/locale/ko'

dayjs.locale('ko')

export const useDateFormat = (dateString: string)=>{
return dayjs(new Date(dateString)).format("YY.M.D.ddd")
}