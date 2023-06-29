export default function ErrMessage({text}: {text: string}) {
    return <span style={{color: 'red', fontSize: '1.6rem', marginTop: '2rem', fontWeight: 'bold'}}>{text}</span>
}