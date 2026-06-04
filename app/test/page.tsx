import React from 'react'

const chat = {
    i : 56,
    text : 'Hello **My Name** is johnny ',

}
 let starts = false;


const Page = () => {

const textarr = chat.text.split(' ');
let starts = false;


return (
  <div>
    {textarr.map((text, i) => {
      if (text.startsWith("**")) {
        starts = true;
      }
      const isBold = starts;
      if (text.endsWith("**")) {
        starts = false;
      }
      return (
        <span key={i} className={isBold ? "font-bold" : ""}>
          {text.replaceAll("**", "")}{" "}
        </span>
      );
    })}
  </div>
);
}

export default Page