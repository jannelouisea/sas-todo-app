import ItemCreatedDate from './ItemCreatedDate';
import renderer from 'react-test-renderer';

describe('ItemCreatedDate', () => {
    const date = 1689652800; // Tue Jul 18 2023 00:00:00 GMT-0400 (EST)

    it('renders correctly', () => {
        const tree = renderer
            .create(<ItemCreatedDate createdAt={date} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders proper styles for completed item', () => {
        const tree = renderer
            .create(<ItemCreatedDate createdAt={date} isCompleted />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders proper styles for newer incomplete item', () => {
        const tree = renderer
            .create(<ItemCreatedDate createdAt={date} isOlder={false} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders properly for older incomplete item', () => {
        const tree = renderer
            .create(<ItemCreatedDate createdAt={date} isOlder />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});