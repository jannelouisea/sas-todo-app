import Typography from '@mui/joy/Typography';
import {
    MUIColor,
    MUIVariant,
    MUIText
} from 'src/static/enums';
import PropTypes from 'prop-types';

type Props = {
    text: string,
    className: string,
}

function Label({ text, className }: Props) {
    return (
        <div className={className}>
            <Typography
                color={MUIColor.Neutral}
                level={MUIText.Label}
                variant={MUIVariant.Plain}
                sx={{ marginBottom: '.25rem' }}
            >
                {text}
            </Typography>
        </div>
    );
}

Label.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
}

Label.defaultProps = {
    className: ''
}

export default Label;