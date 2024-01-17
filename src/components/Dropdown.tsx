
type DropdownProps = {
    options: string[];
    title: string
}

const Dropdown = ({options, title}: DropdownProps) => {
  return (
    <details className="dropdown">
    <summary className="m-1 btn">{title}</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
         {
            options.map((option) => <li key={option}><a>{option}</a></li>
            )
         }
        </ul>
    </details>
  )
}

export default Dropdown