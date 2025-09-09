import { useGlitch } from 'react-powerglitch'
const Cards = ({card, handleMouseEnter, handleMouseLeave, handleFlip, isDark, ContainerCardclassName}) => {
  const glitch = useGlitch();  
  return ( 
         <div
                className={ContainerCardclassName}
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={() => handleMouseLeave(card.id)}
                onClick={() => handleFlip(card.id)}
              >
                {/* Front */}
                <div className="flip-card-front dark:bg-[#ff4b57] bg-white aspect-square flex items-center justify-center rounded text-2xl">
                   {isDark === 'dark' ? '❔' :  '❓'}
                </div>
                {/* Back */}
                <div ref={card.isMatched ?  glitch.ref :  null} className="bg-[#2b2e41] aspect-square flex items-center justify-center rounded text-2xl">
                  {card.isFlipped || card.isHovered || card.isMatched ? (
                    <img src={card.value} alt="card" />
                  ) : (
                     `${isDark === 'dark' ? '❔' :  '❓'}`              
                    )}
                </div>
              </div>
     );
}
 
export default Cards;