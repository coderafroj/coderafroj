import {NavLink,Link} from "react-router-dom"
export default function Header(){
  return(
    <div className="bg-black   w-full fixed top-0 left-0 p-2 z-1000">
      <div className="flex justify-evenly  flex-col ">
        <div className="w-full ">
        <div>
          <Link  className="text-white font-extrabold font-mono text-4xl tracking-widest ring-2 ring-emerald-200">C O D E R A F R O J</Link>
        </div>
        </div>
        <div className="flex gap-24 w-full justify-center">
          <NavLink to="/" className={({isActive})=>`${isActive ? "text-orange-700":"text-gray-600"}`}>Home</NavLink>
            <NavLink to="/about" className={({isActive})=>`${isActive ?"text-orange-700": "text-gray-600"}`}>About</NavLink>
              <NavLink to="/github" className={({isActive})=>`${isActive ? "text-orange-700":"text-gray-600"}`}>Github</NavLink>
        </div>
      </div>
    </div>
    )
}