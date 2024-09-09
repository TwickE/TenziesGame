import crown from './assets/crown.svg'

function Header(props) {
    return(
        <section className='header'>
                <div className='score-item-container'>
                    <img className='score-icon' src={crown} alt="crown icon" />
                    <h2 className='score-item' style={{gridArea: '1 / 1 / 2 / 2'}}>Best Rolls Score: {props.bestRolls}</h2>
                </div>
                <h2 className='score-item' style={{gridArea: '2 / 1 / 3 / 2', marginTop: '0'}}>Current Rolls: {props.rolls}</h2>
                <div className='score-item-container'>
                    <img className='score-icon' src={crown} alt="crown icon" />
                    <h2 className='score-item' style={{gridArea: '1 / 2 / 2 / 3'}}>Best Time Score: {props.bestTime}s</h2>
                </div>
                <h2 className='score-item' style={{gridArea: '2 / 2 / 3 / 3', marginTop: '0'}}>Current Time: {props.time}s</h2>
        </section>
    )
}

export default Header