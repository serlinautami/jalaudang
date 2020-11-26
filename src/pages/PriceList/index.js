import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, PriceListItem, ModalFilter, Icon, ModalSort } from '../../components';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, RefreshControl, Modal, KeyboardAvoidingView, Share} from 'react-native';
import Constants from 'expo-constants';
import { getPriceList, getRegionList } from '../../services';


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
  const [location, setLocation] = React.useState(null);

  const [showFilter, setShowFilter] = React.useState(false);
  const [showSort, setShowSort] = React.useState(false);

  const [regionData, setRegionData] = React.useState(null);
  const [sortData, setSortData] = React.useState(null);
  
  const handlePressButton = (index) => {
    setActionButton(index)

    if(index === 0) {
      setShowFilter(true);
    }

    if(index === 1) {
      setShowSort(true);
    }
  }

  const handleModalClose = () => {
    setShowFilter(false)
    setRegionData(null);
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

  const handleCloseModalSort = () => {
    setShowSort(false);
    setSortData(null);
  }

  const handleLocationSet = data => {
    setLocation(data);
  }

  const handleSortOptionChange = data => {
    setSortData(data);
  }

  const handleSubmitSort = () => {
    if(sortData) {

      setShowSort(false)
      if(sortData.value === 'terdekat') {
        getRegionList({
          params: {
            search: location && location.address && location.address.region ? location.address.region : ''
          }
        }).then(res => {
          if(res && res.length > 0) {
            setLoading(true)
            getPriceList({
              params: {
                region_id: res[0].id
              }
            }).then(result => {
              setPriceData(result);
              setLoading(false)
            }).catch(() => setLoading(false));
          }
         })
      }
    }
  }

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

  const getListData = React.useCallback(() => {
    setLoading(true)
    getPriceList().then(result => {
      setPriceData(result);
      setLoading(false)
    }).catch(() => setLoading(false));
  }, [])

  const renderIcon = (index) => {
    return <Icon style={styles.buttonIcon} width={28} height={28} icon={index === 0 ? 'ic-filter' : "ic-sort"} fill="#aaa" />
  }


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
              <PriceListItem key={index} data={data} onPressItem={() => navigateDetail(data.id)} key={index} onPressShare={() => onShare(data)} />
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.buttonWrapper}>
        {buttons.map((button, index) => {
          return (
            <TouchableOpacity onPress={() => handlePressButton(index)} key={index} style={[styles.button, (activeButton === index  && styles.buttonActive)]}>
              {renderIcon(index)}
              <View>
                <Text style={styles.buttonText}>{button.title}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonTextSmall}>{regionData && index === 0 ? regionData.name : sortData && sortData.label && index === 1 ? sortData.label : "Tidak ada Filter"}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      <Navbar title="Harga Udang"/>
      <ModalFilter onPressFilter={handlePressFilter} onPressResetFilter={handlePressResetFilter}  onSelectChange={handleChangeSelectRegionData} visible={showFilter} onPressClose={handleModalClose} />
      <ModalSort onLocationSet={handleLocationSet} onPressFilter={handleSubmitSort}  onSelectChange={handleSortOptionChange} visible={showSort} onPressClose={handleCloseModalSort} />

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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#177EF4"
  },
  buttonActive: {
    backgroundColor: "#1164C4"
  },
  buttonText: {
    fontWeight: 'bold',
    color: "#ffffff",
    fontSize: 18
  },
  buttonTextSmall: {
    fontSize: 11,
    color: "#fff",
    opacity: 0.6
  },
  buttonIcon: {
    marginRight: 8
  }
})


export default PriceList;