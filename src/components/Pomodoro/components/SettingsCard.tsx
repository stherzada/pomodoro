
import { Button } from "../../Buttton/Button"

interface Props {
  cardBase: string
  workInput: number | ""
  setWorkInput: (val: number | "") => void
  restInput: number | ""
  setRestInput: (val: number | "") => void
  onApply: () => void
}

export function SettingsCard({ cardBase, workInput, setWorkInput, restInput, setRestInput, onApply }: Props) {
  return (
    <div className={`${cardBase} !bg-neopurple dark:!bg-[#8528c1] !shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
      <h3 className="font-black uppercase mb-6 tracking-tighter text-black flex items-center gap-2 text-xl">
        <span className="w-4 h-4 bg-black rounded-full"></span>
        Settings
      </h3>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase dark:text-white/80">Focus (min)</label>
            <div className="bg-white/90 dark:bg-slate-900/90 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:translate-x-1 focus-within:translate-y-1 focus-within:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex">
              <input
                className="w-full bg-transparent p-3 text-lg font-black outline-none placeholder-black/30 dark:placeholder-white/30 dark:text-white transition-colors text-center"
                type="number"
                value={workInput}
                onChange={(e) => {
                  const val = e.target.value
                  setWorkInput(val === "" ? "" : parseInt(val, 10))
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase dark:text-white/80">Rest (min)</label>
            <div className="bg-white/90 dark:bg-slate-900/90 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:translate-x-1 focus-within:translate-y-1 focus-within:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex">
              <input
                className="w-full bg-transparent p-3 text-lg font-black outline-none placeholder-black/30 dark:placeholder-white/30 dark:text-white transition-colors text-center"
                type="number"
                value={restInput}
                onChange={(e) => {
                  const val = e.target.value
                  setRestInput(val === "" ? "" : parseInt(val, 10))
                }}
              />
            </div>
          </div>
        </div>
        <Button
          className="w-full !px-4 !py-4"
          text="Apply Settings"
          onClick={onApply}
          variant="primary"
        />
      </div>
    </div>
  )
}
