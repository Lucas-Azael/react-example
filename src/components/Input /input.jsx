import './styles.css'

export const Input = ({searchValue, handleChange}) => {
    return (
        <div>
            <input 
            onChange={handleChange}
            value={searchValue}
            type="search" 
            placeholder="Buscar posts"
            />
        </div>
    )
}