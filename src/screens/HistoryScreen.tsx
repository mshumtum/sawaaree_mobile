import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const mockRides = [
  {
    id: '1',
    date: '2024-03-20',
    distance: '5.2',
    duration: '25:30',
    avgSpeed: '12.3',
  },
  // Add more mock data as needed
];

const HistoryScreen = () => {
  const renderRideItem = ({item}) => (
    <View style={styles.rideItem}>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.rideStats}>
        <Text style={styles.stat}>{item.distance} km</Text>
        <Text style={styles.stat}>{item.duration}</Text>
        <Text style={styles.stat}>{item.avgSpeed} km/h</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride History</Text>
      <FlatList
        data={mockRides}
        renderItem={renderRideItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  rideItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rideStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 14,
    color: '#666',
  },
});

export default HistoryScreen;
