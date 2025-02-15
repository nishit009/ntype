import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-[900px] h-[500px] border-2 space-y-[50px]">
          <div className="w-full h-fit flex flex-row justify-evenly items-center border-2 rounded-4xl mt-[4px]">
            <button className="border-2 h-[25px] cursor-pointer w-[25px] mt-[8px]">
              i
            </button>
            <button className="border-2 h-[25px] cursor-pointer w-[25px] mt-[8px]">
              j
            </button>
            <button className="border-2 h-[25px] cursor-pointer w-[25px] mt-[8px]">
              k
            </button>
            <button className="border-2 h-[25px] cursor-pointer w-[25px] mt-[8px]">
              l
            </button>
            <button className="border-2 h-[25px] cursor-pointer w-[25px] mt-[8px]">
              m
            </button>
            <button className="border-2 h-[25px] cursor-pointer w-[25px] mt-[8px]">
              n
            </button>
            <button className="border-2 h-[25px] cursor-pointer w-[25px] mt-[8px]">
              o
            </button>
          </div>
          <div className="h-[300px] w-full border-2 flex flex-col items-center justify-center">
            <div className="h-[200px] w-full border-2 overflow-y-auto p-[30px] font-bold text-2xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloribus, quas? Quos similique corrupti soluta ipsa corporis ab
              voluptas laboriosam ducimus perspiciatis cupiditate repudiandae
              ipsam, magnam numquam iusto, amet excepturi itaque. Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Mollitia aperiam
              inventore quod quas ipsum totam atque, fuga reprehenderit nesciunt
              et molestiae perferendis, quia consectetur illo cumque eligendi.
              Maiores, eum pariatur? Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Dolorum ipsum sunt quam unde consequuntur minus
              aliquid rerum nam perferendis in neque corrupti fuga, hic
              dignissimos molestiae possimus magnam nostrum est! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. In neque, non maiores
              unde consectetur veniam eos quo tempora consequatur laboriosam,
              fugiat itaque, qui consequuntur iusto illo dicta nemo ducimus
              maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Et quisquam, dolores corrupti eveniet vitae totam soluta quod
              nulla nam minus inventore reiciendis corporis? Voluptas laborum
              fugiat rem ab mollitia cumque! Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Repudiandae beatae maiores
              accusantium cumque deserunt architecto suscipit, in illo iusto ea.
              Maxime unde quos nihil saepe exercitationem assumenda magni hic
              dolor.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
