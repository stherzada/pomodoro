import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../Buttton/Button"
import { Timer } from "./Timer"
import { usePomodoro, PomodoroConfig } from "../../hooks/use-pomodoro"
import { useNightMode } from "../../hooks/use-night-mode"
import { StatsCard } from "./components/StatsCard"
import { SettingsCard } from "./components/SettingsCard"

export function PomodoroTimer(props: PomodoroConfig) {
  const p = usePomodoro(props)
  const theme = useNightMode()

  const [workInput, setWorkInput] = React.useState<number | "">(Math.floor(props.PomodoroTime / 60))
  const [restInput, setRestInput] = React.useState<number | "">(Math.floor(props.shortRestTime / 60))

  const handleApplySettings = () => {
    const w = typeof workInput === "number" ? workInput : 0
    const r = typeof restInput === "number" ? restInput : 0
    const workSecs = w * 60
    const restSecs = r * 60

    p.setCustomPomodoroTime(workSecs)
    p.setCustomShortRestTime(restSecs)

    if (p.working) { p.setMainTime(workSecs); p.lastTick.current = Date.now(); }
    else if (p.resting) { p.setMainTime(restSecs); p.lastTick.current = Date.now(); }
    else { p.setMainTime(workSecs); p.lastTick.current = Date.now(); }
  }

  const cardBase = "bg-white dark:bg-slate-800 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transition-colors duration-300 !p-2"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl w-full flex flex-col gap-8 relative"
    >
      <button
        onClick={theme.toggleNightMode}
        className="absolute -top-12 right-0 bg-white dark:bg-slate-800 dark:text-white border-4 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 font-black transition-all z-50 text-xs tracking-wider !p-2"
      >
        {theme.isNightMode ? "☀️" : "🌙"}
      </button>

      {/* Timer Card */}
      <div className={`${cardBase} flex flex-col items-center gap-2 relative overflow-hidden`}>
        <div className="flex flex-col items-center z-10 w-full pt-4 !mx-24 !my-8  ">
          <span className="text-sm font-black uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-4 transition-colors !mb-2">Current Mood</span>
          <span className={`px-6 py-2 text-sm font-black uppercase border-4 border-black shadow-[2px_2px_0_0_#000] transition-colors !px-2 ${p.working ? 'bg-neomagenta text-white' : p.resting ? 'bg-neopink text-black' : 'bg-neoviolet text-white'}`}>
            {p.working ? "Work Mode" : p.resting ? "Resting" : "Ready"}
          </span>

          <div className="my-10 w-full flex justify-center scale-110">
            <Timer mainTime={p.mainTime} />
          </div>

          <div className="flex gap-6 flex-wrap justify-center !mt-8">
            <Button text="Start" onClick={() => p.configureWork()} variant="secondary" className="!p-2" />
            <Button text="Rest" onClick={() => p.configureRest(false)} variant="primary" className="!p-3" />
            <AnimatePresence>
              {(p.working || p.resting) && (
                <Button
                  text={p.timeCounting ? "Pause" : "Play"}
                  onClick={() => p.setTimeCouting(!p.timeCounting)}
                  variant="danger"
                  className="!p-2"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StatsCard
          completedCycles={p.completetedCycles}
          fullWorkingTime={p.fullWorkingTime}
          cardBase={cardBase}
        />
        <SettingsCard
          cardBase={cardBase}
          workInput={workInput}
          setWorkInput={setWorkInput}
          restInput={restInput}
          setRestInput={setRestInput}
          onApply={handleApplySettings}
        />
      </div>
    </motion.div>
  )
}
