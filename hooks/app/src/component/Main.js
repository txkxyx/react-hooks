import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Main = () => (
    <>
        <h1>Menu</h1>
        <ul>
            <li><Link to='/component/class'>クラスコンポーネント</Link></li>
            <li><Link to='/component/function'>関数コンポーネント</Link></li>
            <li><Link to='/hooks/usestate'>useState</Link></li>
            <li><Link to='/hooks/useeffect'>useEffect</Link></li>
            <li><Link to='/hooks/classdidmount'>クラスコンポーネントでのComponentDidMount</Link></li>
            <li><Link to='/hooks/functiondidmount'>関数コンポーネントでのComponentDidMount</Link></li>
            <li><Link to='/hooks/originalhooks'>独自Hooks</Link></li>
        </ul>
    </>
)

export default Main;