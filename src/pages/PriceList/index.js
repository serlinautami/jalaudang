import React from 'react';
import { Navbar, PriceListItem } from '../../components';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';


const buttons = [
  { title: "Filter", icon: "" },
  { title: "Urutkan", icon: "" },
]

const PriceList = () => {
  const [activeButton, setActionButton] = React.useState(0);
  const [dataList, setDataList] = React.useState([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}])
  
  const handlePressButton = (index) => {
    setActionButton(index)
  }

  return (
    <React.Fragment>
      <View style={styles.contentWrapper}>
        <ScrollView>
          {dataList.map((data, index) => {
            return (
              <PriceListItem key={index} />
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