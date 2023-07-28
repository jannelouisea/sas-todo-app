import IconButton from '@mui/joy/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import PropTypes from 'prop-types';

import {
    MUIColor,
    MUIVariant,
    MUISize
} from 'src/static/enums'

type Props = {
    color: MUIColor,
    variant: MUIVariant,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

function ToggleItemButton({ color, variant, onClick }: Props) {
    return (
        <IconButton
            color={color}
            id='complete-item-button'
            variant={variant}
            aria-label='Complete item button'
            onClick={onClick}
            sx={{ borderRadius: '50%' }}
            size={MUISize.Small}
        >
            <DoneIcon fontSize='inherit' />
        </IconButton>
    );
}

ToggleItemButton.propTypes = {
    color: PropTypes.oneOf([...Object.values(MUIColor)]),
    variant: PropTypes.oneOf([...Object.values(MUIVariant)]),
    onClick: () => { }
}

ToggleItemButton.defaultProps = {
    color: MUIColor.Primary,
    variant: MUIVariant.Outlined,
    onClick: () => { }
}

export default ToggleItemButton;