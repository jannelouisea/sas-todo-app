import Button from '@mui/joy/Button';
import PropTypes from 'prop-types';
import {
    MUIColor,
    MUIVariant,
    MUISize
} from 'src/static/enums'

type Props = {
    label: string,
    color: MUIColor,
    filterEnabled: boolean,
    startIcon: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className: string,
    ariaLabel: string,
}

function FilterByButton({ label, color, filterEnabled, startIcon, onClick, className, ariaLabel }: Props) {
    return (
        <div className={className}>
            <Button
                className={className}
                startDecorator={startIcon}
                size={MUISize.Small}
                sx={{ borderRadius: '4rem' }}
                variant={filterEnabled ? MUIVariant.Solid : MUIVariant.Soft}
                color={filterEnabled ? color : MUIColor.Neutral}
                onClick={onClick}
                aria-label={ariaLabel}
            >
                {label}
            </Button>
        </div>
    );
}

FilterByButton.propTypes = {
    label: PropTypes.string,
    color: PropTypes.oneOf([...Object.values(MUIColor)]),
    filterEnabled: PropTypes.bool,
    startIcon: PropTypes.object,
    onClick: PropTypes.func,
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
}

FilterByButton.defaultProps = {
    filterEnabled: true,
    className: '',
    startIcon: <></>,
    ariaLabel: 'Filter by button',
}

export default FilterByButton;