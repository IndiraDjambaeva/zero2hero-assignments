import { useState } from "react";

function Message (){
    const [myNumber, setMyNumber] = useState(0);
  const [name, setName] = useState("");

  function increment() {
    // Sets the new value to the old value + 1
    setMyNumber(myNumber + 1);
  }
  
  function display(_name){
    setName(_name)
  }

  return (
    <div>
      <p>{myNumber}</p>
      <p>{name}</p>
      <input type="text" onChange={(e) => display(e.target.value)}/>
      <button onClick={increment}>Increment!</button>
    </div>
  );
}
export default Message;