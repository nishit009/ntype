import { useState, useEffect, useRef } from "react";
import "./App.css";
import friends from "./assets/friends-3.png";
import got from "./assets/got.webp";

const Themes = [
  { name: "Friends", image: friends, words: [] },
  {
    name: "GOT",
    image: got,
    words: [
      "Targaryen",
      "Hodor",
      "you  know  nothing  jon  snow!!",
      "Drogon",
      "Dracarys!!",
      "Wildfire",
      "Most  men  fuck  like  dogs",
      "Starks",
      "Valar  Morghulus",
      "my  father  always  says  every  thing  before  a  but  is  shit",
      "Jamie  lannister",
      "daenerys  targayen",
      "winter  is  coming",
      "A  lannister  always  pays  his  debt",
      "samwell  tarly",
      "a  son  for  a  son",
      "direwolf",
      "redwomen",
      "brienne  of  tarth",
      "rob  stark",
    ],
  },
];

function App() {
  const [currentindex, setCurrentindex] = useState(0);
  const [iscorrect, setIscorrect] = useState("");
  const [userinput, setUserinput] = useState("");
  const [wordindex, setWordindex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [backgroundTheme, setBackgroundTheme] = useState("");
  const containerRef = useRef(null);
  const inputref = useRef(null);
  const selectedTheme = Themes.find((v) => v.name === backgroundTheme);
  const handleKeyPress = (e) => {
    const selectedW = selectedWords[wordindex];
    const selectL = selectedW[currentindex];
    if (e.key === selectL) {
      setUserinput("");
      setIscorrect("correct");
      setCurrentindex((prev) => prev + 1);
      if (currentindex + 1 >= selectedW.length) {
        setCurrentindex(0);
        setWordindex((prev) => prev + 1);
      }
    } else if (e.key === " ") {
      setUserinput("");
      setWordindex((prev) => prev + 1);
      setCurrentindex(0);
    } else {
      setIscorrect("incorrect");
    }
  };
  useEffect(() => {
    {
      backgroundTheme && inputref.current.focus();
    }
    if (!backgroundTheme || !containerRef.current) return;
    if (!selectedTheme || !selectedTheme.words) return;

    const maxwidth = containerRef.current.clientWidth; // Get container width
    let totalWidth = 0;
    let newSelectedWords = [];

    // Shuffle words
    const shuffledWords = [...(selectedTheme?.words || [])].sort(
      () => 0.5 - Math.random()
    );

    // Create a hidden span to measure text width
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.whiteSpace = "nowrap";
    span.style.fontSize = "1.25rem"; // Tailwind XL (≈ 20px)
    span.style.fontFamily = "Arial, sans-serif";
    document.body.appendChild(span);

    for (let word of shuffledWords) {
      span.innerText = word;
      let wordWidth = span.offsetWidth;

      if (totalWidth + wordWidth <= maxwidth) {
        newSelectedWords.push(word);
        totalWidth += wordWidth + 10; // Add spacing
      } else {
        break;
      }
    }

    setSelectedWords(newSelectedWords);
    document.body.removeChild(span); // Clean up
  }, [backgroundTheme]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div
        className="w-[1100px] h-[500px] border-2 space-y-[50px]"
        ref={containerRef}
      >
        {/* Buttons */}
        <div className="w-full h-fit flex flex-row justify-evenly items-center border-2 rounded-4xl mt-[4px]">
          {["i", "j", "k", "l", "m", "n", "o"].map((char, index) => (
            <button
              key={index}
              className="border-2 h-[25px] cursor-pointer w-[25px] mt-[8px]"
            >
              {char}
            </button>
          ))}
        </div>

        {/* Theme Selection */}
        <div className="h-[300px] w-full border-2 flex flex-col items-center justify-center">
          <div
            className="flex justify-center items-center border-2 w-[200px] h-fit"
            style={{
              backgroundImage: selectedTheme
                ? `url(${selectedTheme.image})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <select
              className="w-[200px] h-[50px] appearance-none -webkit-appearance: none px-[45px] bg-transparent text-transparent"
              onChange={(e) => setBackgroundTheme(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Theme
              </option>
              {Themes.map((value, index) => (
                <option key={index} className="text-black" value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          {/* Display Selected Words */}
          {backgroundTheme && (
            <div className={`w-full px-[20px] text-xl flex flex-wrap gap-2 `}>
              {selectedWords.map((word, ind) => (
                <div
                  key={ind}
                  className={`${
                    iscorrect === "incorrect" ? "text-red-400" : "text-[#666]"
                  }`}
                >
                  {word.split("").map((char, index) => (
                    <span
                      key={index}
                      className={`${
                        iscorrect === "correct"
                          ? "text-green-500"
                          : "text-[#666]"
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
              <input
                type="text"
                value={userinput}
                onChange={(e) => setUserinput(e.target.value)}
                ref={inputref}
                // className="absolute opacity-0"
                onKeyDown={handleKeyPress}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
