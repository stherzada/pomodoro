
import { secondsToTime } from "../../../utils/seconds-to-time"

interface Props {
  completedCycles: number
  fullWorkingTime: number
  cardBase: string
}

export function StatsCard({ completedCycles, fullWorkingTime, cardBase }: Props) {
  return (
    <div className={`${cardBase} !bg-[#cd8aff] dark:!bg-[#712ef2] !shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
      <h3 className="font-black uppercase mb-3 tracking-tighter text-black dark:text-white flex items-center gap-2 text-lg transition-colors">
        <span className="w-3 h-3 bg-black dark:bg-white rounded-full transition-colors"></span>
        Stats
      </h3>
      <div className="grid grid-cols-1 gap-2">
        <div className="bg-white/90 dark:bg-black/40 p-3 border-4 border-black shadow-[3px_3px_0_0_#000] transition-all !pl-1">
          <p className="text-[10px] font-black uppercase dark:text-black/80 mb-0 transition-colors">Cycles</p>
          <p className="text-2xl font-black text-black dark:text-white transition-colors">{completedCycles}</p>
        </div>
        <div className="bg-white/90 dark:bg-black/40 p-3 border-4 border-black shadow-[3px_3px_0_0_#000] transition-all !pl-1">
          <p className="text-[10px] font-black uppercase dark:text-black/80 mb-0 transition-colors">Focus Time</p>
          <p className="text-2xl font-black text-black dark:text-white transition-colors">{secondsToTime(fullWorkingTime)}</p>
        </div>
      </div>
    </div>
  )
}
