# React Hooksでライフサイクルメソッドを再現する

最近Reactを勉強しはじめました。基本文法はある程度理解できてきたので、React Hooksを初めて行こうともいます。

## Reactのコンポーネント

Reactのコンポーネントには大きく分けて以下の2つがあります。

- クラスコンポーネント
- 関数コンポーネント

`React.Component`を継承したクラスコンポーネントではstateという状態を持つことができ、またライフサイクルメソッドを用いてきめ細やかな描写制御を行うことができます。

例）

```javascript
import React from 'react';
class App extends React.Component{
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

export default App;
```

一方の関数コンポーネントは、最もシンプルな方法でコンポーネントの定義できるものの、状態（state）を管理することができません。また`React.Component`のコンポーネントライフサイクルを利用することができません。

例）

```javascript
const Message = (props) => {
    return <div>{ props.message }</div>
}
```

## React Hooks

そこで、関数コンポーネントの中からでもReactのstateやライフサイクル機能へアクセスできるようにするのがReact Hooksです。
関数コンポーネントにHooksを導入することで、クラスコンポーネントとほぼ同等の機能を実現することができます。

Hooksを導入した詳しい経緯などは、公式ドキュメントを参照してみてください。

[https://ja.reactjs.org/docs/hooks-intro.html#motivation](https://ja.reactjs.org/docs/hooks-intro.html#motivation)

Hooksは以下のような種類があります。

| 関数 | 概要 | 
| --- | --- |
| useState | 関数コンポーネント内で状態(state)を扱うための関数 |
| useEffect |  |
| useContext |  |
| useReducer |  |
| useCallback |  |
| useMemo |  |
| useRef |  |
| useImperativeHandle |  |
| useLayoutEffect |  |
| useDebugValue |  |

## useState

`useState`は関数コンポーネント内で扱う、状態(state)とそれを更新する関数(setState)を提供します。
引数と戻り値は以下のようになります。

```javascript
const [ state, setState ] = useState(initialState);
```

引数の`initialState`は初回レンダー時のstateの値を意味します。
戻り値のstateにはレンダー時の状態が、setStateにはそのstateを更新するための関数になります。
実装例は以下のようになります。

```javascript
import React, { useState } from 'react';

const initialCount = 1;
const initialValue = 1;

const App = () => {
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

export default App;
```

useStateは複数使用することができます。
useStateは関数のトップレベルで使用する必要があるため、if文やfor文の中では使用することができません。
useStateは更新関数に値だけでなく関数を渡すことができます。
また更新関数に現在値と同じstateを渡した場合、更新の回避が起こりReactはレンダーやDOMの更新を実行せず処理を終了します。

## useEffect

useEffectはReactのレンダーが終了した後に、引数で受け取った関数を実行するための関数です。Reactにおける副作用とは、

- DOMの更新
- APIとの通信
- console.log
- setState
- 変数の更新

などの処理のことを指します。

```javascript
useEffect(() => {});
```

基本的に関数コンポーネントの中ではレンダリングに関する処理しか書くことができません。そのため、DOMの操作やAPIからデータを取得したりする処理を実行することができません。そこで使用するのが`useEffect`です。`useEffect`の引数の関数は、コンポーネントのレンダリング後に実行されます。

先述した、`useState`と`useEffect`を使用することで、Reactのライフサイクルメソッドである`ComponentDidMount`を再現することができます。

- クラスコンポーネントでのcomponentDidMount

```jsx
import React from 'react';

class App extends React.Component {
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

export default App;
```

- 関数コンポーネントでの`useState`と`useEffect`

```jsx
import React, { useState, useEffect } from 'react';

const initialDate = new Date();

const App = () => {
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

export default App;
```

`useState`でstateが使用できるようにし、`useEffect'の関数内で'setDate'を利用してstateの'date'を設定しています。
また`useEffect`ではクリーンアップ用関数を返すことができます。
メモリリークを防止するため、コンポーネントがUIから削除される前にクリーンアップ関数が呼び出されます。

## useReducer

`Redux`を触ったことがある人は`reducer`という言葉に反応できるかと思います。
