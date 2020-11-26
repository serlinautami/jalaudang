import React from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from '../SelectDropdown';
import { Modal, StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import Button from '../Button';
import { getRegionList } from '../../services';



const ModalFilter = ({ visible, onPressClose, onPressResetFilter, onPressFilter, onSelectChange }) => {

  const [dataList, setDataList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  React.useEffect(() => {
    getRegionList().then(result => setDataList(result));
  }, [])

  const handleInputSearchChange = (value = '') => {
    if(value && value.length > 0) {
      setLoading(true);
      getRegionList({
        params: {
          scope: 'district',
          search: value
        }
      }).then(result => {
        setDataList(result)
        setLoading(false)
      }).catch(() => setLoading(false))
    }
  }

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
            <SelectDropdown isLoading={loading}  onInputSearchChange={handleInputSearchChange} onSelectChange={onSelectChange} optionLabel="full_name" items={dataList} />
          </View>
        </View>
        <View style={styles.bottomContent}>
          <Button flex outline onPress={onPressResetFilter}>Reset Filter</Button>
          <View style={{width: 16}} />
          <Button flex secondary onPress={onPressFilter}>Filter Lokasi</Button>
        </View>
      </ScrollView>
    </Modal>
  )
}

ModalFilter.propTypes = {
  onSelectChange: PropTypes.func,
  onPressFilter: PropTypes.func,
  onPressResetFilter: PropTypes.func,
  onPressClose: PropTypes.func,
  visible: PropTypes.bool,
}

ModalFilter.defaultProps = {
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

export default React.memo(ModalFilter);