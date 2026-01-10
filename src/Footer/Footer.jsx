import {NavLink} from "react-router-dom"
export default function Footer(){
  return(
    <div className="bg-gray-200 w-full fixed bottom-0 left-0 p-3 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full flex justify-center items-center">
        <div className="text-black font-extrabold">C O D E R A F R O J</div>
        </div>
        <div className=" w-full flex justify-center items-center gap-12">
          <NavLink className={({isActive})=>`${isActive ? "text-orange-700":"text-grey-600"}`}>Home</NavLink>
            <NavLink>About</NavLink>
              <NavLink>Github</NavLink>
               <NavLink>Youtube</NavLink>
        </div>
      </div>
    </div>
    )
}