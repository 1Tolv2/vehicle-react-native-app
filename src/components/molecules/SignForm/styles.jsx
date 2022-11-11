import {StyleSheet} from 'react-native';
import theme from '../../theme/index';

const {colors} = theme;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "50%",
        backgroundColor: colors.white,
        paddingTop: 40,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 40,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },}
    )

export default styles
