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
      instagramName: [],
      displayCondensedname: false,
      displaySearchbar: true
    }
    this.nameCheck = this.nameCheck.bind(this)
    this.clearName = this.clearName.bind(this)
    this.searchName = this.searchName.bind(this)
    // this.condenseName = this.condenseName.bind(this)
  }

  render() {
    return (
      <div className="App">
        <Nameform checkName={this.nameCheck} displaySB={this.state.displaySearchbar} />
        <div>
        <Condensedname conName={this.state.condensedName} clearName={this.clearName} displayCN={this.state.displayCondensedname}/> <br />
        </div>
        <Icons/>
          <Condensedname conName={this.state.condensedName} seaName={this.searchName} cleName={this.clearName} displayCN={this.state.displayCondensedname} /> <br />
        </div>
        <Icons />
        <Domainname domName={this.state.domainName} />
        <Facebook facName={this.state.facebookName} />
        <Twitter twiName={this.state.twitterName} />
        <Instagram insName={this.state.instagramName} />
        <Youtube youName={this.state.youtubeName} />
        <Soundcloud souName={this.state.soundcloudName} />
        <Bandcamp banName={this.state.bandcampName} />
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
    for (let f = 0; f < arrayName.length; ++f) {
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

  searchName() {
    this.setState({
      domainName: this.state.condensedName,
      facebookName: this.state.condensedName,
      twitterName: this.state.condensedName,
      youtubeName: this.state.condensedName,
      soundcloudName: this.state.condensedName,
      bandcampName: this.state.condensedName,
      instagramName: this.state.condensedName,
      displaySearchbar: false
    })
  }

  clearName() {
    this.setState({
      condensedName: [],
      domainName: [],
      facebookName: [],
      twitterName: [],
      youtubeName: [],
      soundcloudName: [],
      bandcampName: [],
      instagramName: [],
      displayCondensedname: false,
      displaySearchbar: true
    })
    document.getElementById('bandname').value = ''
  }
}

class Nameform extends Component {
  render() {
    return (
      <div className='nameform'>
        <h1>What's in a name?</h1>
        <form className={this.props.displaySB ? 'app' : 'hide'} id='bandnames' onSubmit={(e) => { this.props.checkName(e) }}>
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
        <button onClick={this.props.seaName}>Search for this name</button>
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
        Domain: {this.props.domName}
      </div>
    )
  }
  domainnameRequirements() {
    let domName = this.props.domName
    if (domName.length > 63) {
      return
      <div>
        Domainname Requirements
        </div>
    } else {
      return
      <div>
        Domain: {this.props.domName}
      </div>
    }
  }
}

class Facebook extends Component {
  render() {
    return (
      <div>
        Facebook: {this.props.facName}
      </div>
    )
  }
  facebookRequirements() {
    let facName = this.props.facName
    if (facName.length > 50) {
      return
      <div>
        Facebook Requirements
        </div>
    } else {
      return
      <div>
        Facebook: {this.props.facName}
      </div>
    }
  }
}

class Twitter extends Component {
  render() {
    return (
      <div>
        Twitter: {this.props.twiName}
      </div>
    )
  }
  twitterRequirements() {
    let twiName = this.props.twiName
    if (twiName.length > 15) {
      return
      <div>
        Twitter Requirements
        </div>
    } else {
      return
      <div>
        Twitter: {this.props.twiName}
      </div>
    }
  }
}

class Instagram extends Component {
  render() {
    return (
      <div>
        Instagram: {this.props.insName}
      </div>
    )
  }
  instagramRequirements() {
    let insName = this.props.insName
    if (insName.length > 30) {
      return
      <div>
        Instagram Requirements
        </div>
    } else {
      return
      <div>
        Instagram: {this.props.insName}
      </div>
    }
  }
}

class Youtube extends Component {
  render() {
    return (
      <div>
        Youtube: {this.props.youName}
      </div>
    )
  }
}

class Bandcamp extends Component {
  render() {
    return (
      <div>
        Bandcamp: {this.props.banName}
      </div>
    )
  }
}

class Soundcloud extends Component {
  render() {
    return (
      <div>
        Soundcloud: {this.props.souName}
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
