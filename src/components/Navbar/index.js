import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../components';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';


const Navbar = ({ title, onBackPress, showRightButton }) => {

  const navigation = useNavigation();

  const handleBackPress = () => {
    if(onBackPress) {
      onBackPress();
    } 
    if(navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  const renderTitle = () => {
    if(typeof(title) === 'string') {
      return (
        <Text style={styles.navTitleText}>{title}</Text>
      )
    }
    
    return title;
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.navButton} onPress={handleBackPress}>
        <Icon icon="ic-arrow-left" width={24} height={24} />
      </TouchableOpacity>
      <View>{renderTitle()}</View>
      <TouchableOpacity style={styles.navButton}>
        <Icon icon="ic-share" width={24} height={24} />
      </TouchableOpacity>
    </View>
  )
}

Navbar.propTypes = {
  title: PropTypes.any,
  showRightButton: PropTypes.bool,
  onBackPress: PropTypes.func
}
Navbar.defaultProps = {
  title: null,
  showRightButton: true,
  onBackPress: () => {}
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    elevation: 1
  },
  navButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    width: 64,
  },
  navTitle: {},
  navTitleText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default React.memo(Navbar);