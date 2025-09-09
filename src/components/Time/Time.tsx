
type SyleProps = {
    time?:string;
    dark:string;
}

type Props = {
    time?: number;
    styles: SyleProps;
    isDark: boolean | string;
}

const Time = ({time, styles, isDark}: Props) => {
    return ( 

        <h1 className={`${styles.time} ${isDark ? styles.dark : ""}`}>
            Time: {time}
        </h1>

     );
}
 
export default Time;