interface Props{
    value: number,
    onClick: () => void
}

function Cell({value, onClick}:Props) {
    const char = ['O', '\u00A0\u00A0\u00A0', 'X'][value + 1];
    const color = (value == -1) ? 'text-red-500' : 'text-black';
    return (
        <div onClick={onClick} className= {`text-3xl ${color} p-5 bg-white`} >{char}</div>
    )
}

export default Cell