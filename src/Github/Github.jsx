import React from "react"
import {useLoaderData} from "react-router-dom"

export default function Github(){
   const data=useLoaderData()
  // const [data,setData]=React.useState([])
  // React.useEffect(()=>{
  //   fetch("https://api.github.com/users/codersohil").then(res=>res.json()).then(res=>setData(res))
  // },[])
  return(
    <div className="w-full">
      <div className="w-1/2">
        <div className="w-40 h-40">
          <img className="h-full w-full rounded-full" src={data.avatar_url}/>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center flex-col">
          <h2>username : {data.login}</h2>
          <h3>followers : {data.followers}</h3>
        </div>
      </div>
    </div>
    
    )
}

export const loader=async ()=>{
    const response= await fetch("https://api.github.com/users/coderafroj") 
    return response.json()
  }