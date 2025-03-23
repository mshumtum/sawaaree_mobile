import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/colors';
import SearchInput from '../../components/SeachInput';
import HeaderMain from '../../components/HeaderMain';
import LocationItem from '../Homepage/sheets/LocationItem';
import IMAGES from '../../assets/images';
import {useAppSelector} from '../../store/hooks';
import {getLocationFromAddress} from '../../store/slices/bookingSlice';

interface LocationItem {
  id: string;
  name: string;
  address: string;
}

const SearchLocForBook = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const fromLocationData = route.params?.fromLocationData;
  const toLocationData = route.params?.toLocationData;
  const {nearbyLocations} = useAppSelector(state => state.booking);

  const locTextRef = useRef<any>(null);
  const dropLocationRef = useRef<any>(null);

  const [pickupLocationName, setPickupLocationName] = useState(
    fromLocationData?.name || '',
  );
  const [dropLocationName, setDropLocationName] = useState(
    toLocationData?.name || '',
  );
  const [isPickupLocation, setIsPickupLocation] = useState(false);
  const [searchResults, setSearchResults] = useState<LocationItem[]>([]);
  const [pickupLocation, setPickupLocation] = useState<any>(fromLocationData);
  const [dropLocation, setDropLocation] = useState<any>(toLocationData);

  const onChangePickupLocation = (text: string) => {
    setPickupLocationName(text);
    setIsPickupLocation(true);
    clearTimeout(locTextRef.current);
    locTextRef.current = setTimeout(() => {
      onGetLocationFromAddress(text);
    }, 1000);
  };
  const onChangeDropLocation = (text: string) => {
    setDropLocationName(text);
    setIsPickupLocation(false);
    clearTimeout(locTextRef.current);
    locTextRef.current = setTimeout(() => {
      onGetLocationFromAddress(text);
    }, 1000);
  };

  const onGetLocationFromAddress = (text: string) => {
    console.log('pickupLocationName>>>', text);
    getLocationFromAddress(text)
      .then((data: any) => {
        const newList = data?.map((item: any) => {
          return {
            id: item.place_id,
            name: item.display_name?.split(',')[0],
            address: item.display_name,
            latitude: item.lat,
            longitude: item.lon,
          };
        });
        setSearchResults(newList);
      })
      .catch((error: any) => {
        console.log('error>>>', error);
      });
  };

  return (
    <Container>
      <View style={styles.container}>
        <HeaderMain title={'Search Location'} />

        {/* Location Fields */}
        <View style={styles.locationFields}>
          <View style={styles.locationField}>
            <View style={styles.dotIndicator}>
              <View style={[styles.dot, styles.greenDot]} />
            </View>
            <View style={styles.fieldContent}>
              <SearchInput
                value={pickupLocationName}
                onChangeText={onChangePickupLocation}
                placeholder="Search Pickup Location"
                label="Pickup Location"
                onFocus={() => {
                  setIsPickupLocation(true);
                }}
              />
            </View>
          </View>

          <View style={styles.locationField}>
            <View style={styles.dotIndicator}>
              <View style={[styles.dot, styles.redDot]} />
            </View>
            <View style={styles.fieldContent}>
              <SearchInput
                ref={dropLocationRef}
                value={dropLocationName}
                onChangeText={onChangeDropLocation}
                placeholder="Search Drop Location"
                label="Drop Location"
                onFocus={() => {
                  setIsPickupLocation(false);
                }}
              />
            </View>
          </View>
        </View>

        {/* Search Results */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            {searchResults?.length > 0 ? 'Search Results' : 'Nearby Locations'}
          </Text>

          <FlatList
            keyboardShouldPersistTaps="always"
            data={searchResults?.length > 0 ? searchResults : nearbyLocations}
            renderItem={({item}) => (
              <LocationItem
                onPress={() => {
                  if (isPickupLocation) {
                    setPickupLocationName(item.name);
                    setPickupLocation(item);
                  } else {
                    setDropLocationName(item.name);
                    setDropLocation(item);
                  }
                }}
                item={item}
              />
            )}
            keyExtractor={(item, index) => 'key_' + index.toString()}
            contentContainerStyle={styles.resultsList}
            ListEmptyComponent={
              <Text style={styles.noResults}>No results found</Text>
            }
            ListFooterComponent={
              <TouchableOpacity style={styles.mapOption}>
                <Image
                  source={IMAGES.gpsIcon}
                  style={{width: 20, height: 20}}
                />
                <Text style={styles.mapOptionText}>Select From Map</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </View>
      {/* <View style={styles.confirmContainer}>
        <Text>Confirm</Text>
      </View> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.primary,
  },
  locationFields: {
    // backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  locationField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  dotIndicator: {
    width: 24,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  greenDot: {
    backgroundColor: '#4CAF50',
  },
  redDot: {
    backgroundColor: '#F44336',
  },
  fieldContent: {
    flex: 1,
    marginLeft: 12,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    padding: 16,
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationIcon: {
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    padding: 8,
  },
  mapOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mapOptionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  noResults: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
  },
  confirmContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    padding: 16,
    width: 120,
    backgroundColor: colors.primary,
  },
});

export default SearchLocForBook;
