import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    FilterByNewer,
    FilterByOlder,
    FilterByCompleted,
    Label,
} from 'src/components';

type Props = {
    className: string
}

function FilterByTypeSection({ className }: Props) {
    const rootStyles = classNames('filter-by-type-section', className);

    return (
        <div className={rootStyles}>
            <Label text='Filter by' />
            <div className='filter-types'>
                <FilterByNewer className='filter-by-type' />
                <FilterByOlder className='filter-by-type' />
                <FilterByCompleted className='filter-by-type' />
            </div>
        </div>
    );
}

FilterByTypeSection.propTypes = {
    className: PropTypes.string,
}

FilterByTypeSection.defaultProps = {
    className: ''
}

export default FilterByTypeSection;