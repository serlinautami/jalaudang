import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../../components';
import { View, ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import { getPriceDetail } from '../../services';


const PriceDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [loading, setLoading] = React.useState(false);
  const [detail, setDetail] = React.useState(null);


  const getInititalData = React.useCallback(() => {
    setLoading(true);
    getPriceDetail(id)
      .then(result =>  {
        setDetail(result.data);
        setLoading(false);
      })
      .catch(() => setLoading(false))
  }, [])


  const renderSpecies = () => {
    if(detail && detail.species) {
      return detail.species.aliases || detail.species.name
    }

    return '-'
  }

  const renderLocation = () => {
    if(detail && detail.date_region_full_name) {
      let region = detail.date_region_full_name.split(' - ')[1];
      return `${region}`;
    }
    return '-'
  }

  const renderPriceList = () => {
    if(!detail) {
      return null;
    }

    let objectKeys = Object.keys(detail);

    objectKeys = objectKeys.filter(key => {
      if(key.indexOf('size_') !== -1) {
        return true;
      }

      return false;
    });

    let pricelist = objectKeys.map(key => {
      let size = key.split('_')[1];
      let price = detail[key] ? `Rp. ${detail[key]}` : '-'
      return { 
        title: `Harga Ukuran ${size}`,
        price
      }
    })

    return pricelist.map((data, index) => (
      <View key={index} style={styles.sectionList}>
        <Text style={styles.sectionListText}>{data.title}</Text>
        <Text style={styles.sectionListText}>{data.price}</Text>
      </View>
    ))
  }

  const renderNote = () => {
    if(!detail) {
      return null;
    }

    return (
    <View style={styles.section}>
      <Text>Catatan:</Text>
      <Text>{detail.remark}</Text>
    </View>
    )
  }

  const renderContact = () => {
    if(!detail) {
      return null
    }

    return (
      <View style={styles.section}>
        <Text>Kontak:</Text>
        <Text>{detail.contact}</Text>
      </View>
    )
  }

  React.useEffect(() => {
    getInititalData();
  }, [])

  return (
    <React.Fragment>
      <View style={styles.contentWrapper}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getInititalData} />
        }>
          <View style={styles.divider} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Spesies: {renderSpecies()}</Text>
            <Text style={styles.sectionHeaderTextBlue}>{renderLocation()}</Text>
          </View>
          <View style={styles.divider} />
          {renderPriceList()}
          <View style={styles.divider} />
          {/* <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perkembangan harga (ukuran 100)</Text>
          </View> */}
          <View style={styles.divider} />
          {renderNote()}
          <View style={styles.divider} />
          {renderContact()}
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
    fontSize: 14,
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