import { fireEvent, render, screen } from "@testing-library/react";
import  Button  from '.';

describe('<Button />', () => {
    
    it('should render button with the text Load More', () => {
        render(<Button label="Load more" />);
        const button = screen.getByRole('button', { name: /load more/i});

        expect(button).toBeInTheDocument();
    });

    it('should render button have class name btn-container', () => {
        render(<Button label="Load more" />);
        const button = screen.getByRole('button', { name: /load more/i});
        expect(button).toHaveAttribute('class', 'btn-container')
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button label="Load more" onClick={fn}/>);
        const button = screen.getByRole('button', { name: /load more/i});

        fireEvent.click(button);

        expect(fn).toHaveBeenCalled();
    })

    it('should be disabled when disabled is true', () => {
        render(<Button label="Load more" disabled={true}/>);
        const button = screen.getByRole('button', { name: /load more/i});


        expect(button).toBeDisabled();
    })
})