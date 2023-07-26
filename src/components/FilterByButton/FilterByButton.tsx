import Button from '@mui/joy/Button';
import PropTypes from 'prop-types';

type JoyUIColor = 'primary' | 'success' | 'warning';

type Props = {
    label: string,
    color: JoyUIColor,
    filterEnabled: boolean,
    startIcon: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className: string,
}

function FilterByButton({ label, color, filterEnabled, startIcon, onClick, className }: Props) {
    return (
        <Button
            className={className}
            startDecorator={startIcon}
            size='sm'
            sx={{ borderRadius: '4rem' }}
            variant={filterEnabled ? 'solid' : 'soft'}
            color={filterEnabled ? color : 'neutral'}
            onClick={onClick}
        >
            {label}
        </Button>
    );
}

FilterByButton.propTypes = {
    label: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'success', 'warning']),
    filterEnabled: PropTypes.bool,
    startIcon: PropTypes.object,
    onClick: PropTypes.object,
    className: PropTypes.string,
}

FilterByButton.defaultProps = {
    filterEnabled: true,
    className: '',
}

export default FilterByButton;