import { useEffect, useState } from "react"
import ActionBar from "../layout/ActionBar";
import { SpinnerBackGround } from "../reusableComponents/loadingComponent";


function SearchPage() {

    const [searchHistory, setSearchSistory] = useState(
        JSON.parse(localStorage.getItem('search history')) || []
    )
    const [showSearchHistory, setShowSearchHistory] = useState(true)

    const [search, setSearch] = useState('');


    useEffect(()=>{
        localStorage.setItem('search history', JSON.stringify(searchHistory))
    },[searchHistory])

    function handleSubmit(e) {
        e.preventDefault();
        if (search.length < 1) return

        setSearchSistory([
            ...searchHistory,
            {id:Date.now(), title:search}
        ])
        setShowSearchHistory(false)
    }

    function deleteHistory(id) {
        setSearchSistory(searchHistory.filter(item=>item.id !== id))
    }

    
    const [videos, setVideo] = useState()
    const [isLoading, setIsloading] = useState(true)
    const [error, setError] = useState(null);
    const API_KEY = 'AIzaSyDJLNzghzm4WJugDzXXJzX6j2scLaxD4jM';
    const DEFAULT_QUERY = 'movie trailer reels';

    

    useEffect(()=>{
        setIsloading(true)

        const controller = new AbortController();
        const signal = controller.signal

        fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(search)}&part=snippet&type=video&maxResults=40`,{signal})
        .then(res =>{
            setIsloading(false)
            return res.json()
        })
        .then(res =>{ 
            setVideo(res?.items);
            console.log(res)})
        .catch(err =>{ 
            setError(err);
            setIsloading(false)
            console.error(err)
        });

        return ()=> controller.abort()
    },[search])

    return(
        <div className="h-[fit-content] bg-black text-white overflow-x-hidden">
          <header className="w-[100vw] flex justify-between p-2 fixed lg:top-2">

            <form onSubmit={(e)=>handleSubmit(e)} className="w-[75%] sm:w-[80%]">
                <input type="search" value={search}
                 onChange={(e)=> setSearch(e.target.value)}
                 placeholder="search videos, movies and series"
                 className="w-[100%] rounded-full p-1 border-[1px] border-amber-50"
                />
            </form>
            
            <ActionBar className='w-[20%] flex justify-between sm:w-[15%]' />

           </header>
            
          {searchHistory.length > 0 && showSearchHistory ?
            <div className="p-2 mt-[6vh] lg:bg-gray-950 lg:w-[80vw] ">
                <div className="flex justify-between md:pl-[2%] md:pr-[2%] md:mb-1 lg:pr-[2%]">
                    <h1>Recent</h1> 
                    <button onClick={()=> setSearchSistory([])}>clear all</button>
                </div>
                
                {searchHistory?.map(item=>
                    <div key={item.id} 
                      className="flex justify-between md:pl-[2%] md:pr-[2%] lg:pr-[2%]">
                        <span>{item.title}</span>
                        <button onClick={()=> deleteHistory(item.id)}
                            className="text-red-500">
                            x
                        </button>
                    </div>
                 )}
            </div>
            : null
          }

          <div className="w-[100vw] p-2 mt-[20vh]">
            
            <h1>{error && error.message}</h1>
            {isLoading? <SpinnerBackGround/> :
                ( videos?.map(video=>
                    <iframe key={video.id.videoId}
                      className="w-[100%] h-[400px] mt-[10px] lg:w-[45%] lg:ml-[3%] lg:inline"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                ))
            }
          </div>
        </div>
    )

}

export default SearchPage