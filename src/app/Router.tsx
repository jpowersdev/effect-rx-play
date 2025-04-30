import { Rx } from "@effect-rx/rx-react"
import * as WebSdk from "@effect/opentelemetry/WebSdk"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import { RootLayout } from "./layouts/RootLayout.js"
import { CreateUser } from "./pages/CreateUser.js"
import { Home } from "./pages/Home.js"
import { UserList } from "./pages/UserList.js"
import { UserView } from "./pages/UserView.js"
import { Providers } from "./Providers.js"

Rx.runtime.addGlobalLayer(
  WebSdk.layer(() => ({
    resource: {
      "serviceName": "user-management",
      "serviceVersion": "1.0.0"
    }
  }))
)

const root = document.getElementById("root")!

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <RootLayout>
      <Providers>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/users">
            <Route index element={<UserList />} />
            <Route path=":id" element={<UserView />} />
            <Route path="create" element={<CreateUser />} />
          </Route>
        </Routes>
      </Providers>
    </RootLayout>
  </BrowserRouter>
)
