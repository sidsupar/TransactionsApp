import {BrowserRouter, Routes, Route} from"react-router-dom";
import Layout from "./components/layout.jsx";
import Home from "./pages/home.jsx";
import SignIn from "./pages/signin.jsx"
import SignUp from "./pages/signup.jsx"
function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
