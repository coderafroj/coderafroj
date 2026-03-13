export default function Gpt(){
    const data=async()=>{
        res=await fetch("https://api.openai.com/v1/chat/completions")
        return res.json()


    }
    return(
        <button onClick={data}>click</button>

    )
}