import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(10);
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#f15025").all(10));

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      let colors = new Values(color).all(count);
      setList(colors);
      setCount(count);
      console.log(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  // w input klasa CSS error jest wywoływana w momencie jeżeli useState error = TRUE
  return (
    <>
      <section className="container">
        <h3>Color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={parseInt(count)}
            onChange={(event) => setCount(parseInt(event.target.value))}
            placeholder="10"
          ></input>
          <input
            type="text"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            placeholder="#f15025"
            className={`${error ? "error" : null}`}
          ></input>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          const hex = color.hex;
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
