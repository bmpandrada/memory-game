import ReactMarkdown from "react-markdown";

const markdown = `
# About MemoryMatching.com

At MemoryMatching.com, we create free online memory games designed to boost focus, sharpen recall, and strengthen cognitive function across all age groups.


Whether you're a child learning shapes and letters, a senior maintaining brain health, or just someone who loves puzzles, our ever-growing game collection is here to engage and challenge your mind.

Our games feature beautiful visuals, simple gameplay, and unique categories like animals, flags, food, art, and many more. Play instantly-no downloads, no sign-ups, and no distractions.

We believe brain training should be enjoyable. That’s why we’ve made our platform clean, fast, and mobile-friendly-so you can play at your own pace from any device.

Thanks for visiting. Explore our full game library or try a daily memory challenge to get started!

Welcome to our website where you can play memory games to test and improve your memory skills! Our games are designed to be enjoyable and challenging, and we offer a variety of different types of memory games to choose from. Whether you're a student looking to improve your study skills, a professional seeking to keep your mind sharp, or just someone looking for a fun and engaging way to pass the time, our memory games are sure to provide you with an enjoyable and rewarding experience.

Our memory games are designed to be easy to play and suitable for players of all ages. Simply choose a game from our selection and start playing to test and improve your memory. As you play, you'll be presented with a series of images, numbers, or words, and your task will be to remember as many of them as possible. With practice and repetition, you'll be amazed at how much your memory improves.

In addition to our memory games, we also offer a range of other brain training games and activities to help you keep your mind sharp. From logic puzzles and word games to math challenges and pattern recognition exercises, we have something for everyone. So why wait? Start playing and improving your memory today!
`;


const AboutPage = ({isDark}) => {
   return (
    <div
  className={`${isDark ? 'bg-[#1f2937] text-white' : ''} 
    transition-all ease-in duration-300 
    container flex flex-col justify-start items-center 
    max-w-full min-h-screen p-5 overflow-auto`}
>
  <div className="p-2 max-w-lg mx-auto">
    <ReactMarkdown>{markdown}</ReactMarkdown>
  </div>
</div>
   );
}
 
export default AboutPage;