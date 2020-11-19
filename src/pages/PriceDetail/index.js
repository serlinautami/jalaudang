import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../../components';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants'


const PriceDetail = () => {
  return (
    <React.Fragment>
      <View style={styles.contentWrapper}>
        <ScrollView>
          <View style={styles.divider} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Spesies:</Text>
            <Text style={styles.sectionHeaderTextBlue}>Sulawesi Barat, Memuju Utara, PasanganKayu</Text>
          </View>
          <View style={styles.divider} />
          {[...[1,2,3,4,5,6,7,8,9], ...[1,2,3,4,5,6,7,8,9]].map(val => {
            return (
              <View style={styles.sectionList}>
                <Text style={styles.sectionListText}>Harga ukuran 20</Text>
                <Text style={styles.sectionListText}>Rp90.000,00</Text>
              </View>
            )
          })}
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perkembangan harga (ukuran 100)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text>Catatan:</Text>
            <Text>{`Harga dapat berubah2\nKontak 9\n085155090178\nWA Juga`}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text>Kontak:</Text>
            <Text>Indrawan Lisanto - ADS Vanname - 085155090178</Text>
          </View>
          <View style={styles.divider} />
        </ScrollView>
      </View>
      <Navbar showRightButton title="Detail Harga Udang"/>
    </React.Fragment>
  )
}


const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: "#EAEFF5",
    paddingTop: Constants.statusBarHeight + 64
  },
  divider: {
    height: 8
  },
  sectionHeader: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24 
  },
  sectionHeaderText: {
    fontSize: 12
  },
  sectionHeaderTextBlue: {
    fontWeight: 'bold',
    color: "#177EF4"
  },
  sectionList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  section: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontWeight: "bold"
  }
})


export default PriceDetail;