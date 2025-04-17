import { useState, useEffect } from "react";
import { SpinnerBackGround } from "../reusableComponents/loadingComponent";

function Videos() {
    const [videos, setData] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [error, setError] = useState(null);
    const API_KEY = 'AIzaSyDJLNzghzm4WJugDzXXJzX6j2scLaxD4jM';
    const DEFAULT_QUERY = 'movie trailer reels';

    useEffect(()=>{
          
          fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(DEFAULT_QUERY)}&part=snippet&type=video&maxResults=40`)
            .then(res =>{
                setIsloading(false)
                return res.json()
            })
            .then(res =>{ 
                setData(res);
                console.log(res)})
            .catch(err =>{ 
                setError(err);
                setIsloading(false)
                console.error(err)
            });
    },[])

    return(
        <div className="mt-[3%] w-[100vw] p-2 " >
            <h1>watch</h1>
         {error && error.message}
         {isLoading? <SpinnerBackGround/> : 
            (videos?.items?.map(video=>(
               <iframe key={video.id.videoId}
                className="w-[100%] h-[400px] mt-[10px]"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
               />
            )))
         }
        </div>
    )
}

export default Videos