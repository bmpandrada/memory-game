import { useState, useEffect } from "react";
import Cards from "./Cards";
import Button from "./Button";
import DarkMode from "./Toggle";

const GameCard = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

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
  const [player, setPlayer] = useState({
        name:'',
  })

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
    if(!player.name || dataPlayer.length === 1) return
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

  const handleStart = () => setStart(true);

  const handleReset = () => {
    localStorage.removeItem("memoryGame");
    setFlippedCards([]);
    setWinner(false);
    setStart(false);
    setTime(0);
    setDataPlayer([])

    const duplicated = [...initialCards, ...initialCards];
    const shuffle = duplicated
      .map((card, index) => ({
        id: index + 1,
        value: card.value,
        isFlipped: false,
        isMatched: false,
        isHovered: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffle);
  };

  const handleFlip = (id) => {
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

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
    const newTheme = isDark === "light" ? "dark" : "light";
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      <div className="dark:bg-gray-800 flex flex-col justify-center items-center w-screen h-screen bg-white relative transition-all ease-in">
         <DarkMode toggleDarkMode={toggleDarkMode} isDark={isDark} dataPlayer={dataPlayer} />
        <h1 className="mb-5 text-black dark:text-white font-bold text-xl">
          Time: {time}
        </h1>
        <div className="dark:bg-[#23253a] bg-white w-[600px] border-gray-300 rounded-sm p-2 shadow-xl flex flex-col justify-center max-w-md">
          {isWinner ? (
            <figure className="flex justify-center items-center w-full mx-auto">
              <img
                className="w-full h-full object-cover rounded"
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzNvYzlid254ZnN2ZmJrN21semR0dXo4cXR0eGYxN29uZ2luYTQzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lZTvTGEGKU6gnQ2wBr/giphy.gif"
                alt="Winner"
              />
            </figure>
          ) : (
            <div className="grid grid-cols-4 gap-4 p-4 relative">
              {cards.map((card) => (
                <Cards
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
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 px-5">
                        <div>
                                                    <label htmlFor="name" className="text-black dark:text-white inline-block">Player Name:</label>
                        <input type="text" name="name" value={player.name} onChange={handleChange} className="max-w-md border-b dark:border-white ml-2"/>

                        </div>
                        <Button type={'submit'} 
                            title={'Enter'}
                        className={
                            "cursor-pointer bg-green-500 text-white py-1 px-5 rounded w-fit mx-auto ml-2"
                        }/>
                    </form>
                )}
          {!start ? (
            <Button
              onClick={handleStart}
              title={"Start"}
              className={
                "cursor-pointer bg-blue-500 text-white px-5 py-2 rounded w-fit mx-auto mt-5 mb-4"
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
