import { motion } from "framer-motion"

interface Props {
  text: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'danger'
}

export function Button({ text, onClick, className = "", variant = 'primary' }: Props) {
  const variants = {
    primary: "bg-[#b24bf3] hover:bg-[#c66cfa]",
    secondary: "bg-[#ff90e8] hover:bg-[#ffb3f0]",
    danger: "bg-[#712ef2] text-white hover:bg-[#854bf4]",
  }

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        rotate: -2,
        boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)"
      }}
      whileTap={{
        scale: 0.95,
        rotate: 1,
        x: 6,
        y: 6,
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)"
      }}
      onClick={onClick}
      className={`
        relative px-10 py-4 font-black uppercase tracking-widest text-black
        border-4 border-black transition-all duration-150
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
    >
      {text}
    </motion.button>
  )
}
