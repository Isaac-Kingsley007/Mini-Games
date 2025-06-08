interface Props{
    value: number,
    onClick: () => void
}

function Cell({value, onClick}:Props) {
    const char = ['O', ' ', 'X'][value + 1];
    const color = (value == -1) ? 'text-red-500' : 'text-black';
    return (
        <div onClick={onClick} className= {`text-md ${color} p-3`} >{char}</div>
    )
}

export default Cell