import { Link } from "react-router-dom";

function App() {
  return (
    
    <div className="App">
      <h1 className="font-bold text-center">Pages</h1>
       <ul>
          <li className="px-5 font-bold text-[#797bd1]"><Link to={"/user"}>Link to User Page</Link></li>
          <li className="px-5 font-bold text-[#797bd1]"><Link to={"/admin"}>Link to Admin Page</Link></li>
          <li className="px-5 font-bold text-[#797bd1]"><Link to={"/home"}>Link to Home Page</Link></li>
          <li className="px-5 font-bold text-[#797bd1]"><Link to={"/moderator"}>Link to Moderator Page</Link></li>
          <li className="px-5 font-bold text-[#797bd1]"><Link to={"/signin"}>Link to SignIn Page</Link></li>
          <li className="px-5 font-bold text-[#797bd1]"><Link to={"/signup"}>Link to SignUp Page</Link></li>
          <li className="px-5 font-bold text-[#797bd1]"><Link to={"/exampleArticle/:id"}>Link to ExampleArticle</Link></li>

      </ul>
    </div>
  );
}

export default App;
