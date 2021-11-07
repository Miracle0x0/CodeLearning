//方法一：function
function Line() {
	return (
		<div>
			<hr />
		</div>
	);
}

function Header() {
	return (
		<>
			<header>这是头部</header>
			<Line />
		</>
	);
}

function Footer() {
	return (
		<>
			<Line />
			<footer>这是页脚</footer>
		</>
	);
}

function Title() {
	return <h1>记事本</h1>;
}

function Controller({ add, reset }) {
	return (
		<div>
			<button style={{ marginLeft: "8px" }} onClick={add}>
				添加日志
			</button>
			<button style={{ marginLeft: "8px" }} onClick={reset}>
				清空日志
			</button>
		</div>
	);
}

//list: string[]
function List({ list }) {
	return (
		<ul id="list">
			{list.map((text, index) => (
				<li key={index} className="li">
					{text}
				</li>
			))}
		</ul>
	);
}

//方法二：class
class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			list: [],
		};
	}

	componentDidMount() {
		//ajax
		this.setState({
			list: ["日志1", "日志2"],
		});
	}

	componentDidMount() {
		console.log(this.state.list);
	}

	clearList() {
		//this.state.list = []; 错误写法
		this.setState({
			list: [],
		});
	}

	addText() {
		const text = `日志${this.state.list.length + 1}`;
		this.setState({
			list: [...this.state.list, text],
		});
	}
	render() {
		return (
			<div>
				<Title />
				<Controller
					add={() => {
						this.addText();
					}}
					reset={() => {
						this.clearList();
					}}
				/>
				<List list={this.state.list} />
			</div>
		);
	}
}

//JSX
function App() {
	return (
		<div>
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
