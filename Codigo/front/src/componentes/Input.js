import './Input.css';

export default function Input({text}) {
    return (
        <input type="text" class="input" placeholder={text}/>
    )
  }