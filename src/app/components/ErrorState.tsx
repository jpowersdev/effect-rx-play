import { Cause } from "effect"

interface ErrorStateProps {
  cause: Cause.Cause<any>
}

export const ErrorState = ({ cause }: ErrorStateProps) => (
  <div className="p-3 text-red-600">
    Error: {Cause.pretty(cause)}
  </div>
)
