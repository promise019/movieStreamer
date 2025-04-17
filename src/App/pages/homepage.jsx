import { useEffect, useState } from "react";
import Header from "../layout/Header"
import { SpinnerBackGround } from "../reusableComponents/loadingComponent";
import forword from '../assets/icons/Arrow forward.svg'
import back from '../assets/icons/Arrow back.svg'
import DiscoverSlide from "../reusableComponents/DiscoverSlide";
import Videos from "../layout/Videos";

function HomePage() {
    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(null)
    const [slide, setSlide] = useState(0)

    useEffect(()=>{
        setIsloading(true)
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGM0YzViNjI3YWI4NTRhYzExYWMxM2EyZWI1MjM3ZiIsIm5iZiI6MTc0MzU0Njk2NS42MjYsInN1YiI6IjY3ZWM2YTU1NmNkYmVlYTdiOWNlNDE0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTheHO7ABOe_DCHfSW0h2NXbnTF8NlgK0HC8CupYEik'
            }
          };
          
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(res =>{ 
                setIsloading(false)
                return res.json()
                })
            .then(res =>{
                console.log(res)
                return setData(res)})
            .catch(err =>{ 
                setIsloading(false);
                setError(err)
                console.error(err)}
                );
    },[])

    useEffect(()=>{
        const interval = setInterval(() => {
            setSlide(current=> current >= data?.results?.length - 1 ? 0 : ++current)
        }, 7000);
    
        return () => clearInterval(interval);
    },[])

    return(
        <main className="darkmode">
            <Header/>
            {isLoading ? <SpinnerBackGround className='mt-[50%]'/> : ''}
            {error && <h1>{error?.message}</h1>}
            <div className="w-[100vw] fixed -mt-[30px] z-9">
                <img className="w-[100vw]"
                 src={`https://image.tmdb.org/t/p/w500${data?.results[slide]?.backdrop_path}`}
                 alt={`${data?.results[slide]?.title}`}
                />

                <button className="absolute top-[50%] left-2 w-[6%] border-2 border-amber-50 rounded-full"
                 onClick={()=> setSlide(current=> current <= 0  ? data?.results?.length - 1 : current - 1)}>
                    <img src={back} />
                </button>

                <button className="absolute top-[50%] right-2 w-[6%] border-2 border-amber-50 rounded-full"
                 onClick={()=> setSlide(current=> current >= data?.results?.length - 1 ? 0 : current + 1)}>
                    <img src={forword} />
                </button>

                <div className="bg-gradient-to-b from-transparent to-black w-[100vw] h-[fit-content] z-1 relative -mt-[20%] p-2
                    sm:-mt-[7%]">
                    <h1 className="font-bold">{data?.results[slide]?.title}</h1>
                    <p>{data?.results[slide]?.overview.length > 90 ?
                     data?.results[slide]?.overview.slice(0, 90) + '...' : data?.results[slide]?.overview}
                    </p>
                </div>
            </div>

            <DiscoverSlide/>
            <br />
            <Videos/>
            
        </main>
    )
}

export default HomePage