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
          <>
            <section
              className='flex flex-1 justify-center items-center flex-col py-10'>
              {/* Outlet will honor child component's path */}
              <Outlet />
            </section>

            <img 
              src='/assets/images/side-img.svg' 
              alt='Side bar' 
              className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
            />
          </>
        )
      }
    </>
  )
}

export default AuthLayout