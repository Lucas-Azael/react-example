import { render, screen } from "@testing-library/react"
import { PostCard } from '.'
import { postCardPropsMock } from "./mocks"

const props = postCardPropsMock;

describe('<PostCard />', () => {
    it('should render component', () => {
       render(<PostCard {...props} />)

       expect(screen.getByRole('img', { name: 'Title mock'}))
       .toHaveAttribute('src', props.cover);

       expect(screen.getByRole('heading', {name: 'Title mock'})).toBeInTheDocument()

       expect(screen.getByText('Body mock')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<PostCard {...props} />);
        //O primeiro filho do container é o elemento que ele está renderizando
        expect(container.firstChild).toMatchSnapshot();
    });
})