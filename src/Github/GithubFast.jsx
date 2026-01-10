import {useLoaderData} from "react"
export default function GithubFast(){
  const data=useLoaderData()
  const loader=async ()=>{
    const response= await fetch("https://api.github.com/users/codersohil") 
    return response
  }
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