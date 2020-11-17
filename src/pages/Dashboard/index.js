import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Button from '../../component/Button'
import { StyleSheet, Text, View , Image} from 'react-native';
import logo from '../../assets/logo.png';



export default function Dashboard() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View style={styles.container}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.text}>Jala Udang</Text>
      </View>

      <View style={styles.buttonWrapper}>
      <Button>Daftar Harga</Button>
      </View>
    </React.Fragment>
  )
}

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

