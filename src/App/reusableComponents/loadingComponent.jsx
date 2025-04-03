export function Spinner({className}) {
    return(
        <div className={className}>
        <div className="flex justify-center items-center">
            <div className="rounded-full border-4 border-green-500 animate-spin
                border-t-4 border-t-transparent w-12 h-12
                sm:border-green-500 md:border-green-500">
            </div>
        </div>
        </div>
    )
}

export function SpinnerBackGround({className}){
    return(
        <div className={className}>
            <Spinner/>
        </div>
    )
}