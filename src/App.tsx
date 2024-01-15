import {Routes, Route} from 'react-router-dom';
import SignInForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import './globals.css';
import { Home } from './_root/pages';

const App = () => {
  return (
    <main>
        <Routes>
            {/* public routes */}
            <Route path='/sign-in' element={<SignInForm />} />
            <Route path='/sign-up' element={<SignupForm />} />

            {/* private routes */}
            <Route index element={<Home />} />
        </Routes>
    </main>
  )
}

export default App;