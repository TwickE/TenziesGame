function Die(props) {
    const faceStyles = {
        backgroundColor: props.isHeld ? "#59E391" : "#e7e7e7",
        boxShadow: props.isHeld ? "inset 0 3px #d7ffde, inset 0 -3px #66ae73, inset 3px 0 #96ce9a, inset -3px 0 #96ce9a" : "inset 0 3px white, inset 0 -3px #bbbbbb, inset 3px 0 #d7d7d7, inset -3px 0 #d7d7d7"
    }

    const pip = (key) => <span key={key} className="pip"></span>

    return (
        <div style={faceStyles} className="die-face" onClick={props.handleClick}>
            {Array.from({ length: props.value }).map((_, i) => pip(i))}
        </div>
    )
}

export default Die