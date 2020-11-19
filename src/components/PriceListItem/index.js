import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../../components';


const PriceListItem = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        <Text style={styles.priceText}>Rp. 66,0000</Text>
        <Text style={styles.locationText}>Surabaya</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerInfoText}>12 November 2020, Oleh Haryono  Angkasa</Text>
        </View>
        <TouchableOpacity style={styles.footerAction}>
          <Text style={styles.footerActionText}>Harga lengkap</Text>
          <Icon icon="ic-arrow-right" width={24} height={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.floatButton}>
        <Icon icon="ic-share" width={24} height={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    elevation: 1
  },
  body: {
    paddingBottom: 16
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#177EF4"
  },
  footer: {
    flexDirection: 'row'
  },
  footerInfo: {
    flex: 1,
    paddingRight: 24,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  footerInfoText: {
    fontSize: 12,
    opacity: 0.4,
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  footerActionText: {
    fontSize: 12,
    lineHeight: 26,
    opacity: 0.4
  },
  floatButton: {
    position: 'absolute',
    top: 16,
    right: 24,
    zIndex: 1,
  }
})


PriceListItem.propTypes = {}
PriceListItem.defaultProps = {}

export default React.memo(PriceListItem);