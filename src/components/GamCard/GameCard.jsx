import styles from "./GameCard.module.scss";
import { useState, useEffect } from "react";
import Cards from "../Cards";
import Button from "../Button";
import DarkMode from "../Toggle/Toggle";
import Form from "../Form";
import { generateShuffledCards } from "../../utils/generateShuffle";
import Time from "../Time/Time";

const GameCard = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true; });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }, [isDark]);

  const iconsObject = JSON.parse(import.meta.env.VITE_API_ICONS);
  const initialCards = iconsObject.map((value) => ({ value }));
  const saved = JSON.parse(localStorage.getItem("memoryGame") || "{}");

  const [cards, setCards] = useState(() => {
    if (saved.cards && saved.cards.length > 0) {
      return saved.cards.map((c) => ({ ...c, isHovered: false }));
    }
    const duplicated = [...initialCards, ...initialCards];
    return duplicated
      .map((card, index) => ({
        id: index + 1,
        value: card.value,
        isFlipped: false,
        isMatched: false,
        isHovered: false,
      }))
      .sort(() => Math.random() - 0.5);
  });

  const [time, setTime] = useState(saved.time ?? 0);
  const [start, setStart] = useState(saved.start ?? false);
  const [isWinner, setWinner] = useState(saved.isWinner ?? false);
  const [flippedCards, setFlippedCards] = useState(saved.flippedCards ?? []);
  const [player, setPlayer] = useState({name:'',})

  const [dataPlayer, setDataPlayer] = useState([])

  useEffect(()=> {
    const dateSave = JSON.parse(localStorage.getItem('player-name') || '[]');
    if(dateSave.length > 0) {
        setDataPlayer(dateSave)
    }
  },[])

  useEffect(()=> {
    localStorage.setItem('player-name', JSON.stringify(dataPlayer))
  },[dataPlayer])

  const handleChange = (e) => {
    setPlayer({
        ...player,
        [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!player.name || dataPlayer.length === 1) return;
    const newPlayer = {id: Date.now(), ...player};
    setDataPlayer([newPlayer, ...dataPlayer]);
    setPlayer({
        name:''
    })
  }

  useEffect(() => {
    const gameState = { cards, time, start, flippedCards, isWinner };
    localStorage.setItem("memoryGame", JSON.stringify(gameState));
  }, [cards, time, start, flippedCards, isWinner]);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [start]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setWinner(true);
      setStart(false);
      
    }
  }, [cards]);

const handleMouseEnter = (id) => {
  // exit kung wala pang player na na-submit
  if (dataPlayer.length === 0) return; 

  setCards((prev) =>
    prev.map((card) =>
      card.id === id && !card.isMatched ? { ...card, isHovered: true } : card
    )
  );
};



  const handleMouseLeave = (id) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id && !card.isMatched ? { ...card, isHovered: false } : card
      )
    );
  };

const handleStart = () => {
  if (dataPlayer.length === 0) {
    alert("Please enter your name before starting!");
    return;
  }
  const shuffle = generateShuffledCards(initialCards);
  setCards(shuffle);
  setStart(true);
};


const handleReset = () => {
  localStorage.removeItem("memoryGame");
  setFlippedCards([]);
  setWinner(false);
  setStart(false);
  setTime(0);
  setDataPlayer([]);
  const shuffle = generateShuffledCards(initialCards);
  setCards(shuffle);
};


  const handleFlip = (id) => {
    const clickedCard = cards.find((c) => c.id === id);
    if (dataPlayer.length === 0 || !clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;

      if (first.value === second.value) {
        setCards((prev) =>
          prev.map((card) =>
            card.value === first.value ? { ...card, isMatched: true } : card
          )
        );
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }

      setFlippedCards([]);
    }
  };
 const toggleDarkMode = () => {
  setIsDark((prev) => !prev);
};


  return (
    <>
      <div className={`${styles.container} ${isDark ? styles.dark : ""}`}>
         <DarkMode toggleDarkMode={toggleDarkMode} isDark={isDark} dataPlayer={dataPlayer} />
         <Time time={time} styles={styles} isDark={isDark}/>
        <div className={`${styles["game-wrapper"]} ${isDark ? styles.dark : ""}`}>
          {isWinner ? (
            <figure className="flex justify-center items-center w-full mx-auto">
              <img
                className="w-full h-full object-cover rounded"
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzNvYzlid254ZnN2ZmJrN21semR0dXo4cXR0eGYxN29uZ2luYTQzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lZTvTGEGKU6gnQ2wBr/giphy.gif"
                alt="Winner"
              />
            </figure>
          ) : (
            <div className="grid grid-cols-4 gap-4 p-4 relative ">
              {cards.map((card) => (
                <Cards
                  ContainerCardclassName={`flip-card cursor-pointer flip-card-inner shadow-2xl ${
                  start && card.isFlipped ? "flipped" : ""}`}
                  key={card.id}
                  card={card}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  handleFlip={handleFlip}
                  isDark={isDark}
                />
              ))}
            </div>
          )}
        {!dataPlayer.length > 0 && (
                    <Form 
                        onSubmit={handleSubmit} 
                        className={"w-full flex flex-col gap-2 px-5"}
                        value={player.name}
                        name={'name'} 
                        onChange={handleChange} 
                        title={"Player Name:"} 
                        btnClassname={"cursor-pointer bg-green-500 text-white py-1 px-5 rounded w-fit mx-auto ml-2"} 
                        labelClassName={"text-black dark:text-white text-white inline-block"} 
                        inputClassName={"max-w-md border-b border-white dark:border-b dark:border-white ml-2"}/>
                )}
          {!start ? (
            <Button
              onClick={handleStart}
              title={"Start"}
              className={
                "cursor-pointer bg-red-500 hover:bg-red-800 transition-all ease-in-out duration-300 text-white px-5 py-2 rounded w-fit mx-auto mt-5 mb-4"
              }
            />
          ) : (
            <Button
              onClick={handleReset}
              title={"Reset"}
              className={
                "cursor-pointer bg-yellow-500 text-white px-5 py-2 rounded w-fit mx-auto mt-5 mb-4"
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GameCard;
