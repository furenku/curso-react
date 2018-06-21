import React, { Component } from 'react';

import './App.css';


const User = (props) => {
 
  return (
    <article className="User">
      
      <div className="User-image">
        <img
          src={props.picture.medium}
          alt="..."
        />
      </div>

      <div className="User-name">
        <span className="User-first-name">
          {props.name.first}
        </span>
        &nbsp;
        <span className="User-last-name">
          {props.name.last}
        </span>
      </div>

      <div className="User-email">
        <a href={`mailto:${props.email}`}>
          {props.email}
        </a>
      </div>


    </article>
  )
}

const UserList = (props) => {

  let userList = props.users.map( (item, i) => {
    // return <User key={i} user={item}/>
    
    
    return <User key={i} {...item}/>
  })

  return (
    <ul>
      { userList }
    </ul>
  )
}

class App extends Component {

  state = {
    users: [
      {
        name: {
          first: "Primer Nombre",
          last: "Apellidos"
        },
        email: "nombre@ejemplo.com",
        picture: {
          large: "http://fakeimg.pl/400x400",
          medium: "http://fakeimg.pl/400x400",
          thumbnail: "http://fakeimg.pl/400x400",
        },
      },
    ]
  }


  componentWillMount() {
    
    fetch( 'https://randomuser.me/api/?results=10')
      .then( results => {
        return results.json()
      }).then( data => {

        this.setState({ 'users': data.results })

      })
  }




  render() {
    return (
      <div>
        <UserList users={this.state.users}/>
      </div>
    );
  }
}

export default App;
