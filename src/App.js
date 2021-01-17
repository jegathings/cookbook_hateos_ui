import './App.css'

const React = require('react'); 
const ReactDOM = require('react-dom'); 
const client = require('./client'); 

class App extends React.Component {

  doit = async() =>{
    let response = await client({method: 'GET', path: 'http://localhost:8080/users'})
    console.log("Response is")
    console.log(response.entity._embedded.users)
  }
	componentDidMount() { 
    this.doit()
		//this.setState({employees: response.entity._embedded.employees});
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>I Love You Dina!</h1>
        </header>
      </div>
    );
  }
}
export default App