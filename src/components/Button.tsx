type ButtonProps = {
  type?: "button" | "submit" | "reset"; // optional, default = "button"
  title: string;
  className?: string;
  onClick?: () => void; // optional handler
};

const Button = ({onClick, className, title, type}: ButtonProps) => {
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