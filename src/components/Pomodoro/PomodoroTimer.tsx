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

  const cardBase = "bg-white  border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transition-colors duration-300 !p-2"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl w-full flex flex-col gap-4 relative "
    >
      <button
        onClick={theme.toggleNightMode}
        className="absolute -top-14 right-0  border-4 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 font-black transition-all z-50 text-xs tracking-wider !p-2"
      >
        {theme.isNightMode ? "☀️" : "🌙"}
      </button>

      <div className={`${cardBase} flex flex-col items-center gap-1 relative overflow-hidden !bg-white dark:!bg-[#1111]`}>
        <div className="flex flex-col items-center z-10 w-full pt-2 !mx-12 !my-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] !text-black/50 dark:!text-white  mb-2 transition-colors !mb-1">Current Mood</span>
          <span className={`px-4 py-1 text-xs font-black dark:text-white uppercase border-4 border-black shadow-[2px_2px_0_0_#000] transition-colors ${p.working ? 'bg-neomagenta text-white' : p.resting ? 'bg-neopink text-black' : 'bg-neoviolet text-white'}`}>
            {p.working ? "Work Mode" : p.resting ? "Resting" : "Ready"}
          </span>

          <div className="my-4 w-full flex justify-center scale-100">
            <Timer mainTime={p.mainTime} />
          </div>

          <div className="flex gap-4 flex-wrap justify-center !mt-4">
            <Button text="Start" onClick={() => p.configureWork()} variant="secondary" className="!p-2 !px-6 dark:text-white" />
            <Button text="Rest" onClick={() => p.configureRest(false)} variant="primary" className="!p-3 !px-6 dark:text-white" />
            <AnimatePresence>
              {(p.working || p.resting) && (
                <Button
                  text={p.timeCounting ? "Pause" : "Play"}
                  onClick={() => p.setTimeCouting(!p.timeCounting)}
                  variant="danger"
                  className="!p-2 !px-6"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
