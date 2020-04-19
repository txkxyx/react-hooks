import React, { useState } from 'react';

const HooksComponent = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [password, setPasswrod] = useState("");
  const [body, setBody] = useState("");

  const handleOnclick = () => {
    console.log(title);
    console.log(name);
    console.log(body);
  }

  return (
    <div>
      <form>
        <div>
          <label>Title</label>
          <input type="text" id="title" class="input text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div>
          <label>Name</label>
          <input type="text" id="name" class="input name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="pass" class="input pass" value={password} onChange={(e)=>setPasswrod(e.target.value)}/>
        </div>
        <div>
          <label>Body</label>
          <textarea id="body" onChange={(e) => setBody(e.target.value)}>{body}</textarea>
        </div>
        <button type="button" id="submit" onClick={handleOnclick}>submit</button>
      </form>
    </div>
  )
}

const useInput = (initialState, type, id, className) => {
  const [value, setValue] = useState(initialState);
  return {type, id, className, value, onChange: (e) => setValue(e.target.value)}
}

const useTextarea = (initialState, id, className) => {
  const [value, setValue] = useState(initialState);
  return {id, className, value, onChange: (e) => setValue(e.target.value)}
}

const CustomHooksComponent = () => {
  
  const title = useInput("", "text", "title", "input text");
  const name = useInput("", "text", "name", "input text");
  const password = useInput("", "password", "pass", "input pass");
  const body = useTextarea("","body","textarea");

  const handleOnclick = () => {
    console.log(title.value);
    console.log(name.value);
    console.log(body.value);
  }

  return (
    <div>
      <form>
        <div>
          <label>Title</label>
          <input {...title}/>
        </div>
        <div>
          <label>Name</label>
          <input {...name}/>
        </div>
        <div>
          <label>Password</label>
          <input {...password}/>
        </div>
        <div>
          <label>Body</label>
          <textarea {...body}>{body.value}</textarea>
        </div>
        <button type="button" id="submit" onClick={handleOnclick}>submit</button>
      </form>
    </div>
  )

}

const OriginalHooks = () => (
  <>
    <HooksComponent/>
    <CustomHooksComponent/>
  </>
)

export default OriginalHooks;