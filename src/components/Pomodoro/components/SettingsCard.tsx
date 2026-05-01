
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
      <h3 className="font-black uppercase mb-3 tracking-tighter text-black dark:text-white flex items-center gap-2 text-lg transition-colors">
        <span className="w-3 h-3 bg-black dark:bg-white rounded-full transition-colors"></span>
        Settings
      </h3>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase dark:text-white/80">Focus (min)</label>
            <div className="bg-white/90 dark:bg-black/40 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex">
              <input
                className="w-full bg-transparent p-2 text-base font-black outline-none placeholder-black/30 dark:placeholder-white/30 text-black dark:text-white transition-colors text-center"
                type="number"
                value={workInput}
                onChange={(e) => {
                  const val = e.target.value
                  setWorkInput(val === "" ? "" : parseInt(val, 10))
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase dark:text-white/80">Rest (min)</label>
            <div className="bg-white/90 dark:bg-black/40 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex">
              <input
                className="w-full bg-transparent p-2 text-base font-black outline-none placeholder-black/30 dark:placeholder-white/30 text-black dark:text-white transition-colors text-center"
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
          className="w-full !px-3 !py-2"
          text="Apply Settings"
          onClick={onApply}
          variant="accent"
        />
      </div>
    </div>
  )
}
