import IconButton from '@mui/joy/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
};

function AddItemButton({ onClick }: Props) {
    return (
        <IconButton
            id='add-item-button'
            className='drop-shadow-xl'
            variant='solid'
            aria-label='Add to-do item button'
            size='lg'
            onClick={onClick}
            sx={{ borderRadius: '50%' }}
        >
            <AddIcon />
        </IconButton>
    );
}

AddItemButton.propTypes = {
    onClick: PropTypes.object
}

export default AddItemButton;