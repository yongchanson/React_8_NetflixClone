import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
	<Router>
		<Header />
		<Switch>
			<Route path="/tv">
				<Tv />
			</Route>
			<Route path="/search">
				<Search />
			</Route>
			{/* 모든 경로가 /로 반환되는 것을 방지 : 아래로 이동 */}
			<Route path={["/", "/movies/:movieId"]}>
				<Home />
			</Route>
		</Switch>
	</Router>
	);
}

export default App;