import type { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode
}

const Input = ({children, ...rest }: Props) => {
  if (children) {
    return (
      <div className="relative w-full h-full">
        <input
          className="w-full h-full border-1 border-solid border-gray-200 rounded-xl px-3 sm:px-4 pr-9 sm:pr-10 text-sm sm:text-base transition-all duration-300 focus:outline-none focus:border-gray-400"
          {...rest}
        />
        <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {children}
        </div>
      </div>
    )
  }

  return (
    <input
      className="w-full h-full border-1 border-solid border-gray-200 rounded-xl px-3 sm:px-4 text-sm sm:text-base transition-all duration-300 focus:outline-none focus:border-gray-400"
      {...rest}
    />
  )
}

export default Input
