import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, PriceListItem } from '../../components';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import { getPriceList } from '../../services';
import moment from 'moment';


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
  
  const handlePressButton = (index) => {
    setActionButton(index)
  }

  const navigateDetail = (id) => {
    navigation.navigate('PriceDetail', { id })
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
    <React.Fragment>
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
    </React.Fragment>
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