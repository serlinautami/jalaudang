import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, PriceListItem, ModalFilter } from '../../components';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, RefreshControl, Modal, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { getPriceList } from '../../services';


const buttons = [
  { title: "Filter", icon: "" },
  { title: "Urutkan", icon: "" },
]

const PriceList = ({ navigation }) => {
  const [activeButton, setActionButton] = React.useState(0);
  const [priceData, setPriceData] = React.useState({
    data: [],
    link: {},
    meta: {}
  });
  const [loading, setLoading] = React.useState(false);

  const [showFilter, setShowFilter] = React.useState(false);

  const [regionData, setRegionData] = React.useState(null);
  
  const handlePressButton = (index) => {
    setActionButton(index)

    if(index === 0) {
      setShowFilter(true);
    } else {

    }
  }

  const handleModalClose = () => {
    setShowFilter(false)
  }

  const navigateDetail = (id) => {
    navigation.navigate('PriceDetail', { id })
  }

  const handleChangeSelectRegionData = (data) => {
    setRegionData(data)
  }

  const handlePressFilter = () => {
    const payload = {
      params: {
        region_id: regionData && regionData.id
      }
    }
    setLoading(true);
    setShowFilter(false);
    getPriceList(payload).then(result => {
      setPriceData(result);
      setLoading(false);
    }).catch(() => setLoading(false))
  }

  const handlePressResetFilter = () => {
    setRegionData(null);
    setShowFilter(false);
    getListData();
  }

  const getListData = React.useCallback(() => {
    setLoading(true)
    getPriceList().then(result => {
      setPriceData(result);
      setLoading(false)
    }).catch(() => setLoading(false));
  }, [])


  React.useEffect(() => {
    getListData();
  }, [])

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={0} behavior="padding" style={{flex: 1}}>
      <View style={styles.contentWrapper}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getListData} />
        } >
          {priceData.data.map((data, index) => {
            return (
              <PriceListItem key={index} data={data} onPressItem={() => navigateDetail(data.id)} key={index} />
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.buttonWrapper}>
        {buttons.map((button, index) => {
          return (
            <TouchableOpacity onPress={() => handlePressButton(index)} key={index} style={[styles.button, (activeButton === index  && styles.buttonActive)]}>
              <Text style={styles.buttonText}>{button.title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <Navbar title="Harga Udang"/>
      <ModalFilter onPressFilter={handlePressFilter} onPressResetFilter={handlePressResetFilter}  onSelectChange={handleChangeSelectRegionData} visible={showFilter} onPressClose={handleModalClose} />
    </KeyboardAvoidingView>
  )
}


PriceList.propTypes = {
  navigation: PropTypes.object
};


const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: "#EAEFF5",
    paddingTop: Constants.statusBarHeight + 64
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  button: {
    padding: 16,
    flex: 1,
    backgroundColor: "#177EF4"
  },
  buttonActive: {
    backgroundColor: "#1164C4"
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#ffffff",
    fontSize: 18
  }
})


export default PriceList;