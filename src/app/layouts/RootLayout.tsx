import { Fragment } from "react/jsx-runtime"
import { Navigation } from "./Navigation.js"

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <Navigation />
      <main className="p-4">{children}</main>
    </Fragment>
  )
}
