function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
      <button style={styles} className="Die" onClick={props.handleClick}>{props.value}</button>
    )
  }
  
  export default Die