import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../../components';
import { View, ScrollView, StyleSheet, Text, RefreshControl, Dimensions, Share } from 'react-native';
import Constants from 'expo-constants';
import { getPriceDetail } from '../../services';
import { LineChart } from "react-native-chart-kit";
import moment from 'moment';


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

  const onShare = async (data = {}) => {
    try {

      let region = '';

      if(data.date_region_full_name) {
        let region = data.date_region_full_name.split(' - ')[1];
      }


      const result = await Share.share({
        message:
          `Harga Udang daerah ${region}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


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

    let pricelist = objectKeys.filter(key => {
      let size = key.split('_')[1];
      if(size >= 30 && size <= 120) {
        return true;
      }
      false;
    }).map(key => {
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

  const renderStatus = () => {
    if(!detail) {
      return null
    }

    return (
      <View style={styles.section}>
        <Text>Diedit pada:</Text>
    <Text>{moment(detail.updated_at).format('DD MMMM YYYY')}, Oleh {detail.creator && detail.creator.name}</Text>
      </View>
    )
  }

  const renderChart = () => {
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


    let yLabels = [];
    let xLabels = [];

    let pricelist = objectKeys.filter(key => {
      let size = key.split('_')[1];
      if(size >= 30 && size <= 120) {
        return true;
      }
      false;
    }).map(key => {
      let size = key.split('_')[1];
      let price = detail[key] ? `Rp. ${detail[key]}` : '-'

      if(detail[key]) {
        yLabels.push(size);
        xLabels.push(detail[key]);
      }

      return { 
        title: `Harga Ukuran ${size}`,
        price
      }
    })


    console.log('xLabels', yLabels, xLabels)

    return (
        <LineChart
        data={{
          labels: yLabels,
          datasets: [
            {
              data: xLabels
            }
          ]
        }}
        width={Dimensions.get("window").width - 24 * 2} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `#177EF4`,
          labelColor: (opacity = 1) => `#000`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#177EF4"
          }
        }}
        withInnerLines={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        bezier
        style={{
          marginVertical: 24,
          borderRadius: 16
        }}
      />
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perkembangan harga (ukuran 100)</Text>
            {renderChart()}
          </View>
          <View style={styles.divider} />
          {renderNote()}
          <View style={styles.divider} />
          {renderContact()}
          <View style={styles.divider} />
          {renderStatus()}
        </ScrollView>
      </View>
      <Navbar onRightPress={() => onShare(detail)} showRightButton title="Detail Harga Udang"/>
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