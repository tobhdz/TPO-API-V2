export default function Boton({type, title}) {
    return(
        <div>
            <button
            type={type}
            >
                {title}
            </button>
        </div>
    )
}