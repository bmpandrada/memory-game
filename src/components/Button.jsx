const Button = ({onClick, className, title, type}) => {
    return ( 
        <button
            onClick={onClick}
            type={type || "button"}
            className={className}
          >
            {title}
          </button>
     );
}
 
export default Button;