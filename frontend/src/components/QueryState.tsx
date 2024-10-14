import icon from '../assets/not-found.svg'
import '../styles/queryState.sass'

export default function QueryState(prop :{title: string, text:string}) {
    return (
        <div className='querystate-container'>
            <img src={icon} alt='Logo de Estado' className='querystate-icon' />
            <div className='querystate-content'>
                <h1 className='querystate-title'>{prop.title}</h1>
                <p className='querystate-text'>{prop.text}</p>
            </div>
        </div>
    )
}