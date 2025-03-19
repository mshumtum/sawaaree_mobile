import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const StartRideScreen = () => {
  const [isRiding, setIsRiding] = useState(false);
  const [timer, setTimer] = useState(0);

  const toggleRide = () => {
    setIsRiding(!isRiding);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>0.0</Text>
          <Text style={styles.statLabel}>Distance (km)</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>0:00</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>0.0</Text>
          <Text style={styles.statLabel}>Speed (km/h)</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          isRiding ? styles.stopButton : styles.startButton,
        ]}
        onPress={toggleRide}>
        <Text style={styles.buttonText}>
          {isRiding ? 'Stop Ride' : 'Start Ride'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    padding: 20,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StartRideScreen;
