
import { secondsToTime } from "../../../utils/seconds-to-time"

interface Props {
  completedCycles: number
  fullWorkingTime: number
  cardBase: string
}

export function StatsCard({ completedCycles, fullWorkingTime, cardBase }: Props) {
  return (
    <div className={`${cardBase} !bg-[#cd8aff] dark:!bg-[#712ef2] !shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
      <h3 className="font-black uppercase mb-6 tracking-tighter text-black flex items-center gap-2 text-xl">
        <span className="w-4 h-4 bg-black rounded-full"></span>
        Stats
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white/90 dark:bg-slate-900/90 p-5 border-4 border-black shadow-[3px_3px_0_0_#000] focus-within:shadow-[1px_1px_0_0_#000] transition-all !pl-1">
          <p className="text-xs font-black uppercase dark:text-white/80 mb-1 transition-colors">Cycles</p>
          <p className="text-4xl font-black dark:text-white transition-colors">{completedCycles}</p>
        </div>
        <div className="bg-white/90 dark:bg-slate-900/90 p-5 border-4 border-black shadow-[3px_3px_0_0_#000] transition-all !pl-1">
          <p className="text-xs font-black uppercase dark:text-white/80 mb-1 transition-colors">Focus Time</p>
          <p className="text-4xl font-black dark:text-white transition-colors">{secondsToTime(fullWorkingTime)}</p>
        </div>
      </div>
    </div>
  )
}
