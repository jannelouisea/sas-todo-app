import Typography from '@mui/joy/Typography';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
    MUIVariant,
    MUIText,
} from 'src/static/enums';

type Props = {
    createdAt: number,
    isCompleted: boolean,
    isOlder: boolean,
}

function ItemCreatedDate({ createdAt, isCompleted, isOlder }: Props) {

    const muiTextStyles = { padding: 0, paddingTop: '.25rem', marginLeft: '.25rem', marginRight: '.25rem' };
    const muiIconStyles = { fontSize: '1rem' };

    const isOlderIconClassNames = classNames({ 'hidden': isCompleted || (!isOlder) });

    return (
        <div className='item-created-date'>
            <Typography
                textColor={isCompleted ? 'neutral.700' : 'neutral.500'}
                level={MUIText.Label}
                variant={MUIVariant.Plain}
                sx={muiTextStyles}
            >
                {`Created ${moment.unix(createdAt).format('lll')}`}
            </Typography>
            <div className={isOlderIconClassNames}>
                <HourglassBottomIcon sx={muiIconStyles} />
            </div>
        </div>
    );
}

ItemCreatedDate.propTypes = {
    createdAt: PropTypes.number,
    isCompleted: PropTypes.bool,
    isOlder: PropTypes.bool,
}

ItemCreatedDate.defaultProps = {
    isCompleted: false,
    isOlder: false,
}


export default ItemCreatedDate;