import './App.css'

const React = require('react')
const client = require('./client') 
const follow = require('./follow')

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: null,
      all_users: null
    }
    this.root = 'http://localhost:8080/users'
    this.fetchUser = this.fetchUser.bind(this)
  }

  fetchUser = async() =>{
    let data = await client({method: 'GET', path: 'http://localhost:8080/users/10001'})
    .then((response) => {
      return {
        user: response.entity._links.self.href,
        users: response.entity._links.all_users.href
      }
    })
    return data
  }

  loadFromServer(pageSize) {
    follow(client, this.root, [
      {rel: 'employees', params: {size: pageSize}}]
    ).then(employeeCollection => {
      return client({
        method: 'GET',
        path: employeeCollection.entity._links.profile.href,
        headers: {'Accept': 'application/schema+json'}
      }).then(schema => {
        this.schema = schema.entity;
        return employeeCollection;
      });
    }).done(employeeCollection => {
      this.setState({
        employees: employeeCollection.entity._embedded.employees,
        attributes: Object.keys(this.schema.properties),
        pageSize: pageSize,
        links: employeeCollection.entity._links});
    });
  }

	async componentDidMount() { 
    let data = await this.fetchUser()
    console.log("Data is ")
    console.log(data)
    this.setState({
      user: data.user,
      users: data.users 
    });
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