import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
};

function AddItemButton({ onClick }: Props) {
    return (
        <Tooltip title='Add item' variant='solid' placement='top'>
            <IconButton
                id='add-item-button'
                variant='solid'
                aria-label='Add to-do item button'
                onClick={onClick}
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