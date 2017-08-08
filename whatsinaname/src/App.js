import React, { Component } from 'react'
import './App.css'


const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789'



class App extends Component {

  constructor() {
    super()
    this.state = {
      name: [],
      condensedName: [],
      domainName: [],
      facebookName: [],
      twitterName: [],
      youtubeName: [],
      soundcloudName: [],
      bandcampName: [],
      displayCondensedname: false
    }
    this.nameCheck = this.nameCheck.bind(this)
    this.clearName = this.clearName.bind(this)
    // this.condenseName = this.condenseName.bind(this)
  }

  render() {
    return (
      <div className="App">
        <Nameform checkName={this.nameCheck} /> 
        <div>
        <Condensedname conName={this.state.condensedName} cleName={this.clearName} displayCN={this.state.displayCondensedname}/> <br />
        </div>
        <Icons />
      </div>
    )
  }
  
  nameCheck(e) {
    e.preventDefault()
    let currentName = Array.from(this.state.name)
    currentName.splice(0)
    currentName.push(document.getElementById('bandname').value)
    let newCondensedName = []
    let arrayName = Array.from(currentName.toString().toLowerCase())
    let aNum = Array.from(alphanumeric)
    for (let f = 0; f <arrayName.length; ++f) {
      if (arrayName[f] === '&') {
        arrayName.splice(f, 1, 'a', 'n', 'd')
      }
    }
    for (let i = 0; i < arrayName.length; ++i) {
      for (let j = 0; j < aNum.length; ++j) {
        if (arrayName[i] === aNum[j]) {
          newCondensedName.push(arrayName[i])
        }
      }
    }
    if (newCondensedName.length < 5) {
      alert(`'Most sites require a username of 5 characters or greater; there are currently only ${newCondensedName.length}`)
    } else {
    console.log(aNum)
    console.log(arrayName)
    this.setState({
      name: currentName,
      condensedName: newCondensedName,
      displayCondensedname: true
    })
    }
    // document.getElementById('bandname').value = ''
  }
  
  clearName () {
    this.setState ({
      condensedName: [],
      displayCondensedname: false
    })
    document.getElementById('bandname').value = ''
  }
}

class Nameform extends Component {
  render() {
    return (
      <div className='nameform'>
        <h1>What's in a name?</h1>
        <form id='bandnames' onSubmit={(e) => { this.props.checkName(e) }}>
          <input id='bandname' type='text' />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

class Condensedname extends Component {
  render() {
    return (
      <div className={this.props.displayCN ? 'app' : 'hide'}>
        <p>{this.props.conName}</p> 
        <button>Search for this name</button>
        <button onClick={this.props.cleName}>Try another name</button>
      </div>
    )
  }
}

class Icons extends Component {
  render() {
    return (
      <div>
        <button>Website</button>
        <button>Facebook</button>
        <button>Twitter</button>
        <button>YouTube</button>
        <button>Soundcloud</button>
        <button>Instagram</button>
        <button>Bandcamp</button>
      </div>
    )
  }
}

class Domainname extends Component {
  render() {
    return (
      <div>
        Domainname
      </div>
    )
  }
}

class Facebook extends Component {
  render() {
    return (
      <div>
        Facebook
      </div>
    )
  }
}

class Twitter extends Component {
  render() {
    return (
      <div>
        Twitter
      </div>
    )
  }
}

class Instagram extends Component {
  render() {
    return (
      <div>
        Instagram
      </div>
    )
  }
}

class Youtube extends Component {
  render() {
    return (
      <div>
        Youtube
      </div>
    )
  }
}

class Bandcamp extends Component {
  render() {
    return (
      <div>
        Bandcamp
      </div>
    )
  }
}

class Soundcloud extends Component {
  render() {
    return (
      <div>
        Soundcloud
      </div>
    )
  }
}

// class Condensedname extends Component {
//   render() {
//     return (
//       <div>
//         {this.props.cName}
//       </div>
//     )
//   }
// }

export default App
