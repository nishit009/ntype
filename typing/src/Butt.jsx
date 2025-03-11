import { useState, useRef } from "react";

const DraggableButton = () => {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [showText, setShowText] = useState(false);
  const initialPosition = { x: 80, y: 100 };
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    const button = buttonRef.current;
    setOffset({
      x: e.clientX - button.offsetLeft,
      y: e.clientY - button.offsetTop,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const container = containerRef.current;
    const button = buttonRef.current;

    let x = e.clientX - offset.x;
    let y = e.clientY - offset.y;

    const maxX = container.clientWidth - button.clientWidth;
    const maxY = container.clientHeight - button.clientHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  };

  const handleMouseUp = () => {
    setDragging(false);
    resetPosition();
  };

  const resetPosition = () => {
    const button = buttonRef.current;
    button.style.transition = "all 0.3s ease-in-out";
    button.style.left = `${initialPosition.x}px`;
    button.style.top = `${initialPosition.y}px`;
    setTimeout(() => {
      button.style.transition = "";
    }, 300);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-64 h-64 border ${
        dragging ? "border-black" : "border-none"
      } overflow-hidden rounded-lg`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div>
        <a
          href="https://www.youtube.com/watch?v=3_WvZtSNk3I"
          target="_blank"
          ref={(el) => {
            if (el && dragging) {
              el.onmouseenter = () => window.open(el.href, "_blank");
            }
          }}
          className={`font-bold ${
            showText ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300 ${
            dragging ? "text-green-500" : "text-red-500"
          }`}
        >
          nishit
        </a>
      </div>

      <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
        className={`absolute bg-blue-500 text-white p-3 rounded cursor-grab ${
          dragging ? "cursor-grabbing" : ""
        }`}
        style={{
          left: `${initialPosition.x}px`,
          top: `${initialPosition.y}px`,
        }}
      >
        Drag Me
      </button>
    </div>
  );
};

function Butt() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <DraggableButton />
    </div>
  );
}

export default Butt;
