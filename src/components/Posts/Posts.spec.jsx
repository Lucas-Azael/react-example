import { render, screen } from "@testing-library/react";
import { Posts } from "."

const props = {
    posts: [
        {
            id: 1,
            body: 'Body 1',
            title: 'Title 1',
            cover: 'img1/img1.png'
        },
        {
            id: 2,
            body: 'Body 2',
            title: 'Title 2',
            cover: 'img2/img2.png'
        },
        {
            id: 3,
            body: 'Body 3',
            title: 'Title 3',
            cover: 'img3/img3.png'
        },
    ]
}
describe('<Posts />' , () => {
    it('should render posts', () => {
        render(<Posts {...props}/>)
        
        expect(screen.getAllByRole('heading', {name: /title/i}))
        .toHaveLength(3);
        expect(screen.getAllByRole('img', {name: /title/i}))
        .toHaveLength(3);
        expect(screen.getAllByText(/body/i))
        .toHaveLength(3);
    });

    it('should render posts when no posts are passed', () => {
        render(<Posts />);
        expect(screen.queryAllByRole('heading', {name: /title/i}))
        .toHaveLength(0);
        expect(screen.queryAllByRole('img', {name: /title/i}))
        .toHaveLength(0);
        expect(screen.queryAllByText(/body/i))
        .toHaveLength(0);
    });

    it('should match snapshot', () => {
        const {container} = render(<Posts {...props}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
})