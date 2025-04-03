export function Buttons({children, onClick, className, disabled}) {
    return(
        <button onClick={onClick} className={className} disabled={disabled}>
            {children}
        </button>
    )
}