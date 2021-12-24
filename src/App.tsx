import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Detail from "./Components/Detail"

function App() {
  return (
	<Router>
		<Header />
		<Switch>
			<Route exact path="/tv">
				<Tv />
			</Route>
			<Route path="/search">
				<Search />
			</Route>
			{/* 모든 경로가 /로 반환되는 것을 방지 : 아래로 이동 */}
			{/* <Route path={["/", "/movies/:movieId"]}>
				<Home />
			</Route> */}
			<Route path={["/movies/:movieId", "/tvs/:tvId"]}>
				<Detail />
			</Route>

			<Route path="/">
				<Home />
			</Route>
			{/* <Route path="/" component={() => <Home />}>
        	</Route>
			<Route path="/movies/:movieId" component={() => <Detail />} /> */}
		</Switch>
	</Router>
	);
}

export default App;