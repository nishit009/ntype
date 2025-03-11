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
  const [selectedWords, setSelectedWords] = useState([]);
  const [backgroundTheme, setBackgroundTheme] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [letterindex, setLetterindex] = useState(0);
  const [wrongWord, setWrongWord] = useState(false);
  const selectedTheme = Themes.find((v) => v.name === backgroundTheme);

  const handleClick = (e) => {
    if (e.key === "Shift" || e.key === "CapsLock") return;
    const currentWord = selectedWords[wordindex];
    const currentLetter = currentWord?.[letterindex];

    if (e.key === currentLetter) {
      setLetterindex((prev) => prev + 1);
      setWrongWord(false);
    } else if (e.key !== "Backspace" && e.key !== " ") {
      setLetterindex((prev) => prev + 1);
      setWrongWord(true);
    } else if (e.key === "Backspace" && letterindex > 0) {
      setLetterindex((prev) => prev - 1);
      if (currentWord[letterindex - 1] === currentLetter) {
        setWrongWord(false);
      }
    } else if (e.key === " " && letterindex === currentWord?.length) {
      setWordindex((prev) => prev + 1);
      setLetterindex(0);
      setWrongWord(false);
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (backgroundTheme && inputRef.current) {
      inputRef.current.focus();
    }
    if (!backgroundTheme || !containerRef.current) return;
    if (!selectedTheme || !selectedTheme.words) return;

    const maxwidth = containerRef.current.clientWidth;
    let totalWidth = 0;
    let newSelectedWords = [];

    const shuffledWords = [...(selectedTheme?.words || [])].sort(
      () => 0.5 - Math.random()
    );

    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.fontSize = "1.25rem";
    span.style.fontFamily = "Arial, sans-serif";
    document.body.appendChild(span);

    for (let word of shuffledWords) {
      span.innerText = word;
      let wordWidth = span.offsetWidth;

      if (totalWidth + wordWidth <= maxwidth) {
        newSelectedWords.push(word);
        totalWidth += wordWidth + 10;
      } else {
        break;
      }
    }

    setSelectedWords(newSelectedWords);
    document.body.removeChild(span);
  }, [backgroundTheme]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div
        className="w-[1100px] h-[500px] border-2 space-y-[50px]"
        ref={containerRef}
      >
        <div className="w-full h-fit flex flex-row justify-evenly items-center border-2 rounded-4xl mt-[4px]">
          {"ijklmn".split("").map((char, index) => (
            <button
              key={index}
              className="border-2 h-[25px] cursor-pointer w-[25px] mt-[8px]"
            >
              {char}
            </button>
          ))}
        </div>

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
              className="w-[200px] h-[50px] appearance-none px-[45px] bg-transparent text-transparent"
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
          {backgroundTheme && (
            <div className="w-full px-[20px] text-xl flex flex-wrap gap-2">
              {selectedWords.map((word, wIndex) => (
                <div key={wIndex}>
                  {word.split("").map((char, cIndex) => (
                    <span
                      key={cIndex}
                      className={
                        wIndex < wordindex
                          ? "text-green-500"
                          : wIndex === wordindex && cIndex < letterindex
                          ? wrongWord
                            ? "text-red-500"
                            : "text-green-500"
                          : wIndex === wordindex && cIndex === letterindex
                          ? "underline"
                          : "text-gray-500"
                      }
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
              <input
                ref={inputRef}
                className="opacity-0 absolute"
                onKeyDown={handleClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
