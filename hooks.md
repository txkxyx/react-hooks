# React Hooksをはじめる

最近Reactを勉強しはじめました。基本文法はある程度理解できてきたので、React Hooksを勉強した内容をまとめました。
今回はHooksの入口ということで、`useState`, `useEffect`, `カスタムHooks`の3点に絞ってまとめました。
Hooksの醍醐味はカスタムHooksであるので、useState, useEffectを理解してからカスタムHooksを触れていこうと思います。

## Reactのコンポーネント

Reactのコンポーネントには大きく分けて以下の2つがあります。

- クラスコンポーネント
- 関数コンポーネント

`React.Component`を継承したクラスコンポーネントではstateという状態を持つことができ、またライフサイクルメソッドを用いてきめ細やかな描写制御を行うことができます。

例）

```jsx
import React from 'react';

class ClassComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {message: ''};
    }

    // DOMにレンダーされた後に実行
    componentDidMount(){
        this.setState({
            message: 'Hello World'
        });
    }

    render(){
        return(
            <div>
                { this.state.message }
            </div>
        )
    }
}

export default ClassComponent;
```

一方の関数コンポーネントは、最もシンプルな方法でコンポーネントの定義できるものの、状態（state）を管理することができません。また`React.Component`のコンポーネントライフサイクルを利用することができません。

例）

```jsx
import React from 'react';

const FunctionComponent = (props) => (
    <div>{ props.message }</div>
)

export default FunctionComponent;
```

## React Hooks

そこで、関数コンポーネントの中からでもReactのstateやライフサイクル機能へアクセスできるようにするのがReact Hooksです。
関数コンポーネントにHooksを導入することで、クラスコンポーネントとほぼ同等の機能を実現することができます。

Hooksを導入した詳しい経緯などは、公式ドキュメントを参照してみてください。

[https://ja.reactjs.org/docs/hooks-intro.html#motivation](https://ja.reactjs.org/docs/hooks-intro.html#motivation)

Hooksは以下のような種類があります。

## Hooksのルール

Hooksを利用する場合のルールは以下の2点です。

- トップレベルのみで使用できる

  Hooksはforやifなどのループや分岐、またネストされた関数では使用できません。必ずReact関数のトップレベルで使用する必要があります。

- Reactの関数内でのみ使用できる

  HooksはReactの関数ないでのみ使用できます。通常のJavaScript関数からは呼び出すことができません。

## useState

`useState`は関数コンポーネント内で扱う、状態(state)とそれを更新する関数(setState)を提供します。
引数と戻り値は以下のようになります。

```jsx
const [ state, setState ] = useState(initialState);
```

引数の`initialState`は初回レンダー時のstateの値を意味します。
戻り値は分割代入で、stateにはレンダー時の状態が、setStateにはそのstateを更新するための関数を取得することができます。
実装例は以下のようになります。

```jsx
import React, { useState } from 'react';

const initialCount = 1;
const initialValue = 1;

const HooksUseState = () => {
    const [ count, setCount ] = useState(initialCount);
    const [ value, setValue ] = useState(initialValue);

    const handleOnClick = () =>{
        setCount(count + 1);
        setValue((value) => value * 2);
    }

    return(
      <>
        <div>
          Count: {count}
        </div>
        <div>
          Value: {value}
        </div>
        <div>
            <button onClick={handleOnClick}>Count</button>
        </div>
      </>
    )
}

export default HooksUseState;
```

useStateは複数使用することができ、更新関数に値だけでなく関数を渡すことができます。
また更新関数に現在値と同じstateを渡した場合、更新の回避が起こりReactはレンダーやDOMの更新を実行せず処理を終了します。
またstateはオブジェクトである必要はありません。

## useEffect

useEffectはReactのレンダーが終了した後に、引数で受け取った関数を実行するための関数です。
Reactには副作用という操作があり、その操作を実行するためにuseEffectを使用します。

Reactにおける副作用とは、

- DOMの更新
- APIとの通信
- console.log
- setState
- 変数の更新

などの処理のことを指します。

```jsx
useEffect((args) => {/*APIとの通信など*/});
```

基本的に関数コンポーネントの中ではレンダリングに関する処理しか書くことができません。そのため、DOMの操作やAPIからデータを取得したりする処理を実行することができません。そこで使用するのが`useEffect`です。`useEffect`の引数の関数は、コンポーネントのレンダリング後に実行されます。

```jsx
import React, { useEffect } from 'react';

const HooksUseEffect = () => {

    useEffect(() => {
        document.getElementById("effect").setText("Hello useEffect");
    });

    return(
        <div>
            <div id="effect"></div>
        </div>
    )
}

export default HooksUseEffect;
```

useEffectはuseState同様に1つのコンポーネント内で2回以上実行することができます。ライフサイクルと関連のないロジックと、ライフサイクルに関連のあるロジックを別のuseEffectで実行することもできます。

### useStateとuseEffectを組み合わせる

先述した、`useState`と`useEffect`を使用することで、Reactのライフサイクルメソッドである`ComponentDidMount`とを再現することができます。
1秒ごとに画面の時間を更新するコンポーネントを例に、クラスコンポーネントと関数コンポーネントの実装を比較してみます。

- クラスコンポーネントでのcomponentDidMount

```jsx
import React from 'react';

class ClassComponentDidMount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default ClassComponentDidMount;
```

- 関数コンポーネントでの`useState`と`useEffect`

```jsx
import React, { useState, useEffect } from 'react';

const initialDate = new Date();

const FunctionComponentDidMount = () => {
    const [ date, setDate ] = useState(initialDate);

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date())
        },1000);
        return () => clearInterval(timerId);
    });

    return(
      <div>
          <h2>It is { date.toLocaleTimeString()}</h2>
      </div>
    )
}

export default FunctionComponentDidMount;
```

`useState`でstateが使用できるようにし、`useEffect`の関数内で`setDate`を利用してstateの`date`を設定しています。
また`useEffect`ではクリーンアップ用関数を返すことができます。
メモリリークを防止するため、コンポーネントがUIから削除される前にクリーンアップ関数が呼び出されます。
このコードからわかるように、クラスコンポーネントで副作用を実行する場合は複数のライフサイクルメソッドを実行する必要があるのに対し、関数コンポーネントではuseEffectの1つのAPIで副作用を実行することができます。
副作用の実行を統合できることもHooksのメリットの1つです。クラスコンポーネントでは、`componentDidMount`と`componentUpdateMount`で同じ処理を実装する必要がある場合がありますが、Hooksを利用すれば`useEffect`で統合できます。


## 独自Hooksの作成

これまでのHooksAPIを組み合わせて、自分で独自のカスタムHooksを作成することもできます。カスタムHooksを利用することで、コンポーネントからロジックのみを切り出し再利用可能な関数コンポーネントを作成することができます。
カスタムHooksは、名前が`use`で始まり、他のHooksを呼び出せるJavaScriptの関数である必要があります。

例えば以下のように、APIからデータを取得しレンダリングするコンポーネントがあったとします。

```jsx
import React, { useState, useEffect } from 'react';

const FunctionComponent = (props) => {
  const id = props.id;
  const [data, setData] = useState();

  useEffect(() => {
    setData(/**APIからデータを取得*/);
  })

  return(
    // レンダリング
  )
}

export default FunctionComponent;
```

この関数コンポーネントから、ロジック部分（APIからデータを取得する部分）を切り離します。

```jsx
import React, { useState, useEffect } from 'react';

const useGetData = (id) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(/*APIからデータを取得*/);
  })

  return data;
}

const FunctionComponent = (props) => {
  const id = props.id;
  const data = useGetData(id);

  return(
    // レンダリング
  )
}

export default FunctionComponent;
```

これでAPIを実行してデータを取得する関数（ロジック）と、データを表示するコンポーネントに分離することができました。
ロジック部分は他のコンポーネントでも使いまわせます。
このように、Reactのライフサイクルごとロジックをコンポーネントから切り離しせることがカスタムHooksのいいところのように感じました。

また以下のように、formのインプット要素などをカスタムHooksを使用して共通化することもできます。
要素ごとにonChangeイベントを記述する煩わしいさや、フォームに要素に共通のスタイルを適用する必要がある場合など、より簡潔に実装できるメリットがあるかなと思います。

```jsx
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
```

## まとめ

