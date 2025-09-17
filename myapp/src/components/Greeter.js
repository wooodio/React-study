import {useState} from "react";
export default function Greeter() {
    const [name, setName] = useState("");
    return (
        <div className="card">
            <h2>Hello, {name || "Guest"}!</h2>
            <input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        <form onSubmit={(e)=>{e.preventDefault(); /*처리코드*/}}>
        {/*inputs */}
      <button type="submit"> 추가 </button>
      </form>
            <p>안녕하세요, {name || "익명"}님!</p>
        </div>
    );
}