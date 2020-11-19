import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components'
import { StyleSheet, Text, View , Image} from 'react-native';
import { imgLogo } from '../../assets';



const  Dashboard = ({ navigation }) => {
  return (
    <React.Fragment>
      <View style={styles.container}>
          <Image source={imgLogo} style={styles.image} />
          <Text style={styles.text}>Jala Udang</Text>
      </View>

      <View style={styles.buttonWrapper}>
      <Button onPress={() => navigation.navigate('PriceList')}>Daftar Harga</Button>
      </View>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEFF5',
    justifyContent: 'center',
    alignItems: "center"
  },
  buttonWrapper: {
    padding: 24,
    backgroundColor:"#EAEFF5"
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 24,
  }
});



export default Dashboard;