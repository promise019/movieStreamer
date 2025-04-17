import { useEffect, useState } from "react"
import { SpinnerBackGround } from "./loadingComponent";

function DiscoverSlide() {
    const [data, setData] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [error, setError] = useState(null);
    const API_KEY = 'AIzaSyDJLNzghzm4WJugDzXXJzX6j2scLaxD4jM';
    const DEFAULT_QUERY = 'movie trailer';

    useEffect(()=>{
          
          fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(DEFAULT_QUERY)}&part=snippet&type=video&maxResults=10`)
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
        <div className="mt-[60%] overflow-x-auto overflow-y-hidden ">
            <h1 className="absolute z-0">Discover</h1>
            <br />
            {isLoading && <SpinnerBackGround/>}
            {error && error.message}
            <div className="flex flex-row sm:w-[40%]">
              {data?.items?.map(video=>(
                <iframe key={video.id.videoId}
                 className="w-[190px] h-[auto] inline mr-[10px] sm:w-[100%] sm:h-[300px]"
                 src={`https://www.youtube.com/embed/${video.id.videoId}`}
                 title="YouTube video player"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
                />
              ))}
            </div>
        </div>
    )
}

export default DiscoverSlide