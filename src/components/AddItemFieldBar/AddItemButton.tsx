import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

import {
    MUISize,
    MUIVariant,
    MUIPos,
} from 'src/static/enums';

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
};

function AddItemButton({ onClick }: Props) {
    const muiButtonStyles = { borderRadius: '50%' };

    return (
        <Tooltip title='Add to-do item' size={MUISize.Medium} variant={MUIVariant.Outlined} placement={MUIPos.Right}>
            <IconButton
                id='add-item-button'
                className='drop-shadow'
                variant={MUIVariant.Solid}
                aria-label='Add to-do item button'
                size={MUISize.Large}
                onClick={onClick}
                sx={muiButtonStyles}
            >
                <AddIcon />
            </IconButton>
        </Tooltip>
    );
}

AddItemButton.propTypes = {
    onClick: PropTypes.object
}

export default AddItemButton;