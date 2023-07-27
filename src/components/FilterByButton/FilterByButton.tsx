import Button from '@mui/joy/Button';
import PropTypes from 'prop-types';
import {
    JoyUIColor,
    JoyUIVariant,
    JoyUISize
} from 'src/static/enums'

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
        <div className={className}>
            <Button
                className={className}
                startDecorator={startIcon}
                size={JoyUISize.Small}
                sx={{ borderRadius: '4rem' }}
                variant={filterEnabled ? JoyUIVariant.Solid : JoyUIVariant.Soft}
                color={filterEnabled ? color : JoyUIColor.Neutral}
                onClick={onClick}
                aria-label='Filter by button'
            >
                {label}
            </Button>
        </div>
    );
}

FilterByButton.propTypes = {
    label: PropTypes.string,
    color: PropTypes.oneOf([JoyUIColor.Primary, JoyUIColor.Success, JoyUIColor.Warning]),
    filterEnabled: PropTypes.bool,
    startIcon: PropTypes.object,
    onClick: PropTypes.object,
    className: PropTypes.string,
}

FilterByButton.defaultProps = {
    filterEnabled: true,
    className: '',
    startIcon: <></>,
}

export default FilterByButton;