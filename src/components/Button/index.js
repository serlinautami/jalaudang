import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


const Button = ({ children, onPress, block, flex, outline, secondary }) => {

    const wrapperStyle = StyleSheet.flatten([
        styles.wrapper,
        block && styles.wrapperBlock,
        flex && styles.wrapperFlex,
        outline && styles.wrapperOutline,
        secondary && styles.wrapperSecondary
    ])

    const textStyle = StyleSheet.flatten([
        styles.text,
        secondary &&  styles.textSecondary
    ])

    return (
    <TouchableOpacity onPress={onPress} style={wrapperStyle}>
        <Text style={textStyle}>{children}</Text>
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
        borderWidth: 2,
        borderColor: "#177EF4",
        borderRadius: 8,
        backgroundColor: "#177EF4",
        paddingVertical: 16,
        paddingHorizontal: 24
    },
    wrapperBlock: {
        width: '100%'
    },
    wrapperFlex: {
        flex: 1
    },
    wrapperOutline: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: '#fff'
    },
    wrapperSecondary: {
        backgroundColor: "#fff",
        borderColor: '#fff'
    },
    textSecondary: {
        color: "#177EF4"
    }
})



export default React.memo(Button);