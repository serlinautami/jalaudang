import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


const Button = ({ children, onPress }) => {
    return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
        <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
    )
}

Button.propTypes = {
	children: PropTypes.any,
	onPress: PropTypes.func
};

Button.defaultProps = {
	children: null,
	onPress: () => {}
};

const styles= StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: "center"
    },
    wrapper: {
        borderRadius: 8,
        backgroundColor: "#177EF4",
        paddingVertical: 16,
        paddingHorizontal: 24
    }
})



export default React.memo(Button);