import { useState } from "react";

export function Button() {
	const [counter, setCounter] = useState(0)

	function increment() {
		setCounter(counter + 1);
	}

	return (
    <div>
      O tanto que te amo: 
      <button onClick={increment}>
        {counter}
      </button> 
    </div>
  )
}