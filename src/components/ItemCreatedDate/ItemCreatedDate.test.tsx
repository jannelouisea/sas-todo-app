import ItemCreatedDate from './ItemCreatedDate';
import renderer from 'react-test-renderer';
import moment from 'moment';

describe('ItemCreatedDate', () => {
    const date = moment('2023-07-18').toDate();

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