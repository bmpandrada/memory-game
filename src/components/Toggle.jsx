import Button from "./Button";

const DarkMode = ({toggleDarkMode, isDark, dataPlayer}) => {
    return ( 
        <div className="absolute top-0 right-0 flex flex-row items-center justify-center gap-2 mt-2 mr-5">
          <div className="text-xl">
            <h1 className="dark:text-white text-sm capitalize">Hello, {dataPlayer.length > 0 ? dataPlayer.map(({name})=>(name)) : 'Player'}</h1>
          </div>
          <Button
            onClick={toggleDarkMode}
            title={isDark === "dark" ? "🌑" : "☀️"}
            className={
              "shadow-lg transition duration-300 p-2 text-sm hover:bg-blue-800 rounded-full bg-blue-500 dark:bg-black  dark:hover:bg-gray-500 text-white dark:text-white h-auto cursor-pointer transition-all ease-in"
            }
          />
          
        </div>
     );
}
 
export default DarkMode;