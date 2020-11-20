import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../Icon';
import moment from 'moment';


const PriceListItem = ({ data, onPressItem, onPressShare }) => {
  const renderPrice = () => {
    if(data.size_100) {
      return `Rp. ${data.size_100}`
    }
    return '-';
  }

  const renderLocation = () => {
    if(data.date_region_full_name) {
      let region = data.date_region_full_name.split(' - ')[1];
      return `${region}`;
    }
    return '-'
  }

  const renderInfo = () => {

    let date = moment(data.date).format('DD MMMM YYYY');
    // let contact = data.contact;

    return `${date}, oleh ${data.contact}`
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.body}>
        <TouchableOpacity onPress={onPressItem}>
          <Text style={styles.priceText}>{renderPrice()}</Text>
        </TouchableOpacity>
        <Text style={styles.locationText}>{renderLocation()}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerInfoText}>{renderInfo()}</Text>
        </View>
        <TouchableOpacity onPress={onPressItem} style={styles.footerAction}>
          <Text style={styles.footerActionText}>Harga lengkap</Text>
          <Icon icon="ic-arrow-right" width={24} height={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPressShare} style={styles.floatButton}>
        <Icon icon="ic-share" width={24} height={24} />
      </TouchableOpacity>
    </View>
  )
}


PriceListItem.propTypes = {
  data: PropTypes.object,
  onPressItem: PropTypes.func,
  onPressShare: PropTypes.func
};
PriceListItem.defaultProps = {
  data: {},
  onPressItem: () => {},
  onPressShare: () => {}
};

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
    fontSize: 12,
    maxWidth: 250,
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