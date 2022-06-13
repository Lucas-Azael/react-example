import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Input } from "./input"

describe('<Input />', () => {
    it('should render component', () => {
        render(<Input />)
    });

    it('should have a value of searchValue', () => {
        const fn = jest.fn()
        render(<Input handleChange={fn} searchValue={'Test'}/>)
        
        const input = screen.getByPlaceholderText(/Buscar posts/i)

        expect(input.value).toBe('Test');
    });

    it('should call handleChange function on each key pressed', () => {
        const fn = jest.fn()
        render(<Input handleChange={fn} />)

        const input = screen.getByPlaceholderText(/Buscar posts/i)

        const value = 'Test do input';

        userEvent.type(input, value);
        
        expect(fn).toHaveBeenCalledTimes(value.length);
    });

    it('input value must be equal to the entered value', () => {
        const fn = jest.fn()
        render(<Input handleChange={fn} />)

        const input = screen.getByPlaceholderText(/Buscar posts/i)

        const value = 'Test do input';

        userEvent.type(input, value);
        
        expect(input.value).toBe(value);
    });

    it('should match snapshot', () => {
        const fn = jest.fn()
        const { container } = render(<Input handleChange={fn}/>);
        //O primeiro filho do container é o elemento que ele está renderizando
        expect(container.firstChild).toMatchSnapshot();
    });
})