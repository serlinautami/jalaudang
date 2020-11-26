import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon'
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// format items

const SelectDropdown = ({ items, onSelectChange, optionLabel, optionValue, onInputSearchChange, isLoading, searchInput }) => {

  const [showDropdown, setDropdown] = React.useState(false);
  const [filterText, setFilterText] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleToggleDropdown = () => {
    setDropdown(!showDropdown)
  }

  const handleSearchChange = (value) => {
    setFilterText(value)
    onInputSearchChange(value);
  }

  const getFilteredItems = (keyword = '', data = [], optionLabel, optionValue) => {
    if(keyword && data && data.length > 0) {
      return data.filter(val => {
        if(
          val && 
          val[optionLabel] && 
          typeof(val[optionLabel]) === 'string' && 
          val[optionLabel].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          return true;
        }

        return false
      })
    }

    return data;
  }

  const handleSelectedItem = (data) => {
    setSelectedItem(data)
    onSelectChange(data)
    handleToggleDropdown();
  }

  const renderSelectedItem = () => {
    if(!selectedItem) {
      return 'Select Item..'
    }

    return selectedItem[optionLabel]
  }


  const itemList = getFilteredItems(filterText, items, optionLabel, optionValue);

  return (
    <View style={styles.mainWrapper}>
      <TouchableOpacity onPress={handleToggleDropdown} style={styles.selectWrapper}>
        <Text style={styles.selectText}>{renderSelectedItem()}</Text>
        <Icon style={styles.selectIcon} fill="#fff" icon="ic-arrow-down" width={24} height={24} />
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdownWrapper}>
          {searchInput ? (
            <View style={styles.searchInputWrapper}>
              <TextInput showSoftInputOnFocus={true} onChangeText={handleSearchChange} placeholder="Cari Lokasi.." style={styles.searchTextInput} value={filterText} />
              <Icon style={styles.searchIcon} fill="#aaa" icon="ic-search" width={24} height={24} />
            </View>
          ): null}
          <View style={styles.listWrapper}>
            <ScrollView>
              {isLoading ? (
                <View style={styles.listItemWrapper}>
                  <Text style={styles.listItemText}>Sedang memuat..</Text>
                </View>
              ) : (
                <React.Fragment>
                  {itemList && itemList.length > 0
                    ? itemList.map((val, i) => (
                      <TouchableOpacity key={i} onPress={() => handleSelectedItem(val)} style={styles.listItemWrapper}>
                        <Text style={styles.listItemText}>{val[optionLabel]}</Text>
                      </TouchableOpacity>
                    ))
                    : (
                      <View style={styles.listItemWrapper}>
                        <Text style={styles.listItemText}>Tidak ada data</Text>
                      </View>
                    )
                  }
                </React.Fragment>
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  )
}

SelectDropdown.propTypes = {
  searchInput: PropTypes.bool,
  items: PropTypes.array,
  isLoading: PropTypes.bool,
  optionLabel: PropTypes.string,
  optionValue: PropTypes.string,
  onSelectChange: PropTypes.func,
  onInputSearchChange: PropTypes.func
}
SelectDropdown.defaultProps = {
  items: [],
  searchInput: true,
  isLoading: false,
  optionLabel: "label",
  optionValue: "value",
  onSelectChange: () => {},
  onInputSearchChange: () => {}
}


const styles = StyleSheet.create({
  mainWrapper: {
  },
  selectWrapper: {
    position: "relative",
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: 'hidden'
  },
  selectText: {
    color: "#fff"
  },
  selectIcon: {
    top: 12,
    right: 8,
    position: "absolute",
    color: "#fff"
  },
  dropdownWrapper: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  searchInputWrapper:{
    position: 'relative',
    padding: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  searchTextInput: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ddd'
  },
  searchIcon: {
    position: 'absolute',
    top: 24,
    right: 24
  },
  listWrapper: {
    maxHeight: 150
  },
  listItemWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  listItemText: {}
})

export default SelectDropdown;