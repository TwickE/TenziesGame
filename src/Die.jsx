function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const pip = () => <span className="pip"></span>


    return (
        <div style={styles} className="die-face" onClick={props.handleClick}>
            {Array.from({ length: props.value }).map((_, i) => pip())}
        </div>
    )
}

export default Die
/* function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <button style={styles} className="Die" onClick={props.handleClick}>{props.value}</button>
    )
}

export default Die */