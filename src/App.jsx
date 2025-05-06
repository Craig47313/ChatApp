import Login from "./components/login/login";
import Chat from "./components/chat/chat";
import List from "./components/list/List";
import Detail from "./components/detail/Detail";
//npm run dev
const App = () => {

  const user = false;

  return (
    <div className='container'>
      {user ? (
        <>
          <List/>
          <Chat/>
          <Detail/>
        </>
      ) : (
        <Login/>
      )}
      
    </div>
  )
}

export default App