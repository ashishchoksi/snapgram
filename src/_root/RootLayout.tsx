import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import Topbar from "@/components/shared/Topbar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div style={{border: '1px solid red'}} className='w-full md:flex'>
      
      <Topbar />
      <LeftSidebar />
      
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />

    </div>
  )
}

export default RootLayout