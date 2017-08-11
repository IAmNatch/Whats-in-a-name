import React, { Component } from 'react'
import './App.css'
import axios from 'axios'


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
        displaySearchbar: true,
        defaultButton: true,
        results: {youtube: undefined, facebook: undefined, bandcamp: undefined, soundcloud: undefined}
    }
    this.nameCheck = this.nameCheck.bind(this);
    this.clearName = this.clearName.bind(this);
    this.searchName = this.searchName.bind(this);
    this.processResults = this.processResults.bind(this);
    // this.condenseName = this.condenseName.bind(this)
  }


  render() {
    return (
      <div className="App">
            <div>
                <Nameform checkName={this.nameCheck} displaySB={this.state.displaySearchbar} />
                <div>
                    <Condensedname conName={this.state.condensedName} seaName={this.searchName} cleName={this.clearName} displayCN={this.state.displayCondensedname} /> <br />
                </div>
            </div>
          <Icons results={this.state.results} default={this.state.defaultButton}/>
          {/* <Domainname domName={this.state.domainName} />
          <Facebook facName={this.state.facebookName} />
          <Twitter twiName={this.state.twitterName} />
          <Instagram insName={this.state.instagramName} />
          <Youtube youName={this.state.youtubeName} />
          <Soundcloud souName={this.state.soundcloudName} />
          <Bandcamp banName={this.state.bandcampName} /> */}
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
      let conName = this.state.condensedName;
      let nameString = conName.join('');
      this.setState({
          //   domainName: this.state.condensedName,
          //   facebookName: this.state.condensedName,
          //   twitterName: this.state.condensedName,
          //   youtubeName: this.state.condensedName,
          //   soundcloudName: this.state.condensedName,
          //   bandcampName: this.state.condensedName,
          //   instagramName: this.state.condensedName,
          displaySearchbar: false
      });
      axios.post('http://localhost:8080/name/' + nameString, function(req, res) {
      }).then((result) => {
          this.processResults(result.data);
      });
  }


    processResults(data) {
        console.log('I have run!');
        this.setState({
            results: data,
            defaultButton: false
        })
        console.log('state is displayed below');
        console.log(this.state.results);
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
      displaySearchbar: true,
      defaultButton: true
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
      <div className='App'>
        {/* <button className={this.props.results.domainName ? 'notavailable' : 'available'}>Website</button> */}
        {/* <button className={this.props.results.facebook ? 'notavailable' : 'available'}>Facebook</button> */}
        <div id='circlebutton' className={this.props.default ? 'standard' : this.props.results.facebook ? 'notavailable' : 'available'}>F</div>
        {/* <button className={this.props.results.twitter ? 'notavailable' : 'available'}>Twitter</button> */}
        {/* <button className={this.props.results.youtube ? 'notavailable' : 'available'}>YouTube</button> */}
        <div id='circlebutton' className={this.props.default ? 'standard' : this.props.results.youtube ? 'notavailable' : 'available'}>Y</div>
        {/* <button className={this.props.results.soundcloud ? 'notavailable' : 'available'}>Soundcloud</button> */}
        <div id='circlebutton' className={this.props.default ? 'standard' : this.props.results.soundcloud ? 'notavailable' : 'available'}>S</div>
        {/* <button className={this.props.results.instagram ? 'notavailable' : 'available'}>Instagram</button> */}
        {/* <button className={this.props.results.bandcamp ? 'notavailable' : 'available'}>Bandcamp</button> */}
        <div id='circlebutton' className={this.props.default ? 'standard' : this.props.results.bandcamp ? 'notavailable' : 'available'}>B</div>
      </div>
    )
  }
}

// class Domainname extends Component {
//   render() {
//     return (
//       <div>
//         Domain: {this.props.domName}
//       </div>
//     )
//   }
//   domainnameRequirements() {
//     let domName = this.props.domName
//     if (domName.length > 63) {
//       return
//       <div>
//         Domainname Requirements
//         </div>
//     } else {
//       return
//       <div>
//         Domain: {this.props.domName}
//       </div>
//     }
//   }
// }

// class Facebook extends Component {
//   render() {
//     return (
//       <div>
//         Facebook: {this.props.facName}
//       </div>
//     )
//   }
//   facebookRequirements() {
//     let facName = this.props.facName
//     if (facName.length > 50) {
//       return
//       <div>
//         Facebook Requirements
//         </div>
//     } else {
//       return
//       <div>
//         Facebook: {this.props.facName}
//       </div>
//     }
//   }
// }

// class Twitter extends Component {
//   render() {
//     return (
//       <div>
//         Twitter: {this.props.twiName}
//       </div>
//     )
//   }
//   twitterRequirements() {
//     let twiName = this.props.twiName
//     if (twiName.length > 15) {
//       return
//       <div>
//         Twitter Requirements
//         </div>
//     } else {
//       return
//       <div>
//         Twitter: {this.props.twiName}
//       </div>
//     }
//   }
// }

// class Instagram extends Component {
//   render() {
//     return (
//       <div>
//         Instagram: {this.props.insName}
//       </div>
//     )
//   }
//   instagramRequirements() {
//     let insName = this.props.insName
//     if (insName.length > 30) {
//       return
//       <div>
//         Instagram Requirements
//         </div>
//     } else {
//       return
//       <div>
//         Instagram: {this.props.insName}
//       </div>
//     }
//   }
// }

// class Youtube extends Component {
//   render() {
//     return (
//       <div>
//         Youtube: {this.props.youName}
//       </div>
//     )
//   }
// }

// class Bandcamp extends Component {
//   render() {
//     return (
//       <div>
//         Bandcamp: {this.props.banName}
//       </div>
//     )
//   }
// }

// class Soundcloud extends Component {
//   render() {
//     return (
//       <div>
//         Soundcloud: {this.props.souName}
//       </div>
//     )
//   }
// }

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
