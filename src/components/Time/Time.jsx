const Time = ({time, styles, isDark}) => {
    return ( 

        <h1 className={`${styles.time} ${isDark ? styles.dark : ""}`}>
            Time: {time}
        </h1>

     );
}
 
export default Time;