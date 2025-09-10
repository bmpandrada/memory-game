import styles from "./Toggle.module.scss";
import Button from "../Button";

type Player = {
  id: number;
  name: string
}
type ToogleProps = {
  toggleDarkMode: ()=> void;
  isDark?: boolean | string;
  dataPlayer?:Player[]
}

const DarkMode = ({toggleDarkMode, isDark, dataPlayer}:ToogleProps) => {
    return ( 
        <div className={`${isDark ? styles.dark : ''} ${styles.container}`}>
          <div className="text-xl">
            <h1 className={`${styles.welcome} ${isDark ? styles.dark : ""}`}>Hello, {dataPlayer?.length ? dataPlayer.map(({name})=>(name)) : 'Player'}</h1>
          </div>
          <Button
            onClick={toggleDarkMode}
            title={isDark ? "☀️" : "🌑"}
            className={
               `${styles.btn} ${isDark ? styles.dark : ''}`
            }
          />
          
        </div>
     );
}
 
export default DarkMode;