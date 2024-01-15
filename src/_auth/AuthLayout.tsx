import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  // declare var/state here
  let isAuth: boolean = false;

  // write html code here
  return (
    <>
      {
        isAuth ? 
        (<Navigate to={"/"} />) : 
        (
          <section>
            {/* Outlet will honor child component's path */}
            <Outlet />
          </section>
        )
      }
    </>
  )
}

export default AuthLayout