import {Routes, Route} from 'react-router-dom';
import SignInForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import './globals.css';
import { Home } from './_root/pages';
import RootLayout from './_root/RootLayout';

const App = () => {
  return (
    <main>
        <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
                <Route path='/sign-in' element={<SignInForm />} />
                <Route path='/sign-up' element={<SignupForm />} />
            </Route>

            {/* private routes */}
            <Route element={<RootLayout/>}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    </main>
  )
}

export default App;