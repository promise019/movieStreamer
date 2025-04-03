export function Input({type, onChange, className, checked, value}) {
    return(
        <input type={type}
         value={value}
         checked={checked}
         onChange={onChange}
         className={className}/>
    )
}