import renderer from 'react-test-renderer';
import FilterByTypeSection from './FilterByTypeSection';
import { Provider } from 'react-redux';
import {
    IStoreType,
    createStore
} from 'src/app/store';

describe('FilterByTypeSection', () => {
    let store: IStoreType;

    beforeEach(() => {
        store = createStore();
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <FilterByTypeSection className='foo' />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});