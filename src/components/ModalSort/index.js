import React from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from '../SelectDropdown';
import { Modal, StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import Constants from 'expo-constants';
import Button from '../Button';
import { getRegionList } from '../../services';
import * as Location from 'expo-location';



const ModalSort = ({ visible, onPressClose, onPressResetFilter, onPressFilter, onSelectChange, onLocationSet }) => {

  const [location, setLocation] = React.useState(null);

  const [dataList, setDataList] = React.useState([
    { label:  "Terdekat",  value: "terdekat" },
  ]);
  const [loading, setLoading] = React.useState(false);


  const getGpsLocationPermision = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if(status !== Location.PermissionStatus.GRANTED) {
        throw status;
      }

      return status;
    } catch (err) {
      Alert.alert('Permission to access location was denied')
      throw err;
    }
  }

  const getCurrentLocation = async () => {

    try {
      const permitStatus = Location.getPermissionsAsync();
      if(permitStatus !== Location.PermissionStatus.GRANTED) {
        await getGpsLocationPermision()
      }
      const currentPosition = await Location.getCurrentPositionAsync();
      const currentAddress = await Location.reverseGeocodeAsync({...currentPosition.coords});
      if(currentAddress && currentAddress.length > 0) {
        const location = {
          position: currentPosition,
          address: currentAddress[0]
        }
        onLocationSet(location)
        setLocation(location);
      }
    } catch (err) {
      throw err;
    }
  }

  const handleInputSearchChange = (value = '') => {
    if(value && value.length > 0) {
      setLoading(true);
    }
  }

  React.useEffect(() => {
    getCurrentLocation();
  }, [])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.boxContent}>
          <TouchableOpacity 
            onPress={onPressClose} 
            style={styles.closeBtn}
          >
            <Text style={styles.closeBtnText}>Batal</Text>
          </TouchableOpacity>
          <View>
            <SelectDropdown searchInput={false} isLoading={loading} onSelectChange={onSelectChange} items={dataList} />
          </View>
        </View>
        <View style={styles.bottomContent}>
          <Button flex secondary onPress={onPressFilter}>Terapkan</Button>
        </View>
      </ScrollView>
    </Modal>
  )
}

ModalSort.propTypes = {
  onSelectChange: PropTypes.func,
  onLocationSet: PropTypes.func,
  onPressFilter: PropTypes.func,
  onPressResetFilter: PropTypes.func,
  onPressClose: PropTypes.func,
  visible: PropTypes.bool,
}

ModalSort.defaultProps = {
  onLocationSet: () => {},
  onPressResetFilter: () => {},
  onPressFilter: () => {},
  onSelectChange: () => {},
  onPressClose: () => {},
  visible: false,
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  boxContent: {
    position: 'relative',
    backgroundColor: '#0150AC',
    padding: 16,
    paddingTop: 56
  },
  closeBtn: { 
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  closeBtnText: {
    color: '#fff'
  },
  bottomContent: {
    backgroundColor: "#004392",
    padding: 16,
    flexDirection: 'row'
  }
})

export default React.memo(ModalSort);