import {BrowserRouter, Routes, Route} from"react-router-dom";
import Layout from "./components/layout.jsx";
import Home from "./pages/home.jsx";
import SignIn from "./pages/signin.jsx"
import SignUp from "./pages/signup.jsx"
import { RecoilRoot } from "recoil";
import Dashboard from "./pages/dashboard.jsx";
import SendMoneyWrapper from "./pages/sendMoney.jsx";
function App() {

  return (
    <div>
        <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="send" element={<SendMoneyWrapper />} />
            </Route>
          </Routes>
        </RecoilRoot>
        </BrowserRouter>
    </div>
  )
}

export default App
