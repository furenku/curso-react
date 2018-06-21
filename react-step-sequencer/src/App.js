import React, { Component } from 'react';

import kick from './samples/kick.wav';
import snare from './samples/snare.wav';
import hihat from './samples/hihat.ogg';

import seqStyle from './StepSequencer.css';

const SamplePlayer = React.forwardRef((props, ref) => {
  return (
    <audio src={props.src} ref={ref} controls/>
  )
})

let numSteps = 16;
let emptyArray = Array(numSteps).fill(false);


const StepSequencer = (props) => {

  const toggleButton = (step) => {
    
    let newSeq = [...props.seq]
    newSeq[step] = ! newSeq[step];

    props.stepToggle( props.channel, newSeq )
  }

  let buttonList = props.seq.map( (step, i) => {
    let buttonOnClass = step ? 'on' : '';
    return <button className={buttonOnClass} onClick={()=>toggleButton(i)}>{i+1}</button>
  })

  return (
    <div className="StepSequencer">
      { buttonList }
    </div>
  )
}

class App extends Component {



  samples = [
    kick,
    snare,
    hihat
  ];

  state = {
    seq_0: emptyArray,
    seq_1: emptyArray,
    seq_2: emptyArray,
  }


  samplePlayerRefs = [];

  componentWillUnmount() {
    this.stop()
  }



  play = () => {
    
    let step = 0;

    if( ! this.timer ) {

      this.timer = setInterval(
        () => { 
          
          this.samples.map( (s,i) => {
            
            let keyName = "seq_"+i;
            if( this.state[keyName][ step ]) {

              let audio = this.samplePlayerRefs[i].current;
              
              this.trigger( audio )
            }
            return null;
          })
          
          step++;
          step %= numSteps;

        },
        100
      );
      
    }
  }


  stop = () => {

    clearInterval( this.timer );
    this.timer = null;
    
  }


  handleKeyPress = (event) => {
    
    const indexes = {
      'a': 0,
      'b': 1,
      'c': 2,
    }

    let index = indexes[event.key];
    
    if( index != undefined ) {
      
      let audio = this.samplePlayerRefs[index].current;
      
      this.trigger( audio )
      
    }
 }

  trigger = audio => {
    audio.currentTime = 0;
    audio.play();
  }


  stepToggle = ( channel, seq ) => {
    
    let keyName = "seq_"+channel;
    
    this.setState({
      [keyName]: seq
    })
    
  }

  render() {

    let samplePlayers = this.samples.map( ( sample, i ) => {
      
      this.samplePlayerRefs[i] = React.createRef()
      
      return <SamplePlayer
        key={i}
        src={sample}
        ref={this.samplePlayerRefs[i]}
      />

    })

    let stepSequencers = this.samples.map( (item, i) => {
      let keyName = "seq_"+i;
      return ( 
        <StepSequencer
          channel={i}
          seq={this.state[keyName]}
          stepToggle={ this.stepToggle }
        />
      )
        
    })
    return (
      <div>

        <button onClick={ ()=>this.play() }>
          Play
        </button>

        <button onClick={ ()=>this.stop() }>
          Stop
        </button>

        {samplePlayers}


        
        <input type="text" onKeyPress={this.handleKeyPress} />

        { stepSequencers }

      </div>
    );
  }


}

export default App;
