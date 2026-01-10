import afu from '../assets/AFROJ.jpg'
export default function About(){
  return(
   <div className="w-full">
     <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4" >
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-56"><img className="rounded-2xl" src={afu}/></div>
      </div> 
      <div className="md:w-1/2 w-full  capitalize">
        <h2 className="mb-4 uppercase font-semibold">CODERAFROJ</h2>
        <p className="text-gray-500">hello my name is coderafroj i am from india,my hobby innu and much more</p></div>
     </div>
   </div> 
    )
}