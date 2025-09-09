
import styles from './Cards.module.scss'
import { useGlitch } from 'react-powerglitch'
const Cards = ({card, handleMouseEnter, handleMouseLeave, handleFlip, isDark, ContainerCardclassName}) => {
  const glitch = useGlitch();  
  const hamdleKeydown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
     if(e.key === 'Enter' || e.key === "") {
                    e.preventDefault()
                    handleFlip(card.id)
      }
  }
  return ( 
         <button
                className={ContainerCardclassName}
                tabIndex={0}
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={() => handleMouseLeave(card.id)}
                onClick={() => handleFlip(card.id)}
                onKeyDown={hamdleKeydown}
              >
                {/* Front */}
                <div className={`${styles["flip-card-front"]} " dark:bg-[#ff4b57] bg-white aspect-square flex items-center justify-center rounded text-2xl"`}>
                   {isDark ? '❔' :  '❓'}
                </div>
                {/* Back */}
                <div ref={card.isMatched ?  glitch.ref :  null} className="bg-[#2b2e41] aspect-square flex items-center justify-center rounded text-2xl">
                  {card.isFlipped || card.isHovered || card.isMatched ? (
                    <img src={card.value} alt="card" />
                  ) : (
                     `${isDark ? '❔' :  '❓'}`              
                    )}
                </div>
              </button>
     );
}
 
export default Cards;