import GameCard from "../components/GamCard/GameCard";

type DataProps = {
    dataPlayer:  string[];
    isDark?: boolean;
    setDataPlayer: string[];
}

const GamePage = ({dataPlayer, isDark, setDataPlayer}: DataProps) => {
    return ( 
        <GameCard dataPlayer={dataPlayer} isDark={isDark} setDataPlayer={setDataPlayer}/>
     );
}
 
export default GamePage;