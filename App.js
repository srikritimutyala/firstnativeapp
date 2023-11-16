import { StatusBar } from 'expo-status-bar';
import 'expo-dev-client';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { db } from './firebase.js';
import { doc, setDoc, getDoc } from "firebase/firestore";

const App = () => {
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const fetchEventsByLocation = async () => {
      //This is a test commit
    const options = {
      method: 'GET',
      url: 'https://real-time-events-search.p.rapidapi.com/search-events',
      params: {
        query: location,
        start: '0',
      },
      headers: {
        'X-RapidAPI-Key': 'e2df6e46e9msh447cbb3b80c21d8p1120afjsn5b48a6dda562',
        'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setEvents(response.data.data);
      setSelectedEvent(null); // Reset selectedEvent when fetching new events
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleSaveEvent = async () => {
    if (selectedEvent && selectedDay) {
      console.log("asjfgbsldkjg")
      const eventRef = doc(db, 'events', selectedDay);
      const eventDoc = await getDoc(eventRef);

      // Check if the document for the selected day already exists
      if (eventDoc.exists()) {
        // If the document exists, update the events array
        await setDoc(eventRef, { events: [...eventDoc.data().events, selectedEvent] }, { merge: true });
      } else {
        // If the document doesn't exist, create a new one with the events array
        await setDoc(eventRef, { events: [selectedEvent] });
      }

      setSelectedEvent(null);

    }
  };

  const days = ['Day 1', 'Day 2', 'Day 3'];

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.dayButtons}>
          {days.map((day, index) => (
              <TouchableOpacity key={index} onPress={() => handleDayClick(day)}>
                <View style={styles.dayButton}>
                  <Text>{day}</Text>
                </View>
              </TouchableOpacity>
          ))}
        </View>

        {selectedDay && <Text style={styles.selectedDay}>{`Selected Day: ${selectedDay}`}</Text>}

        <Text style={styles.heading}>Find Events in Your Area</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter location"
            value={location}
            onChangeText={(text) => setLocation(text)}
        />
        <Button title="Search Events" onPress={fetchEventsByLocation} />

        {events.length > 0 && !selectedEvent && (
            <View>
              <Text style={{ fontSize: 18, marginTop: 16 }}>Event Options in {location}</Text>
              <FlatList
                  data={events}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleEventClick(item)}>
                        <View style={{ marginBottom: 8 }}>
                          <Text>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                  )}
              />
            </View>
        )}


        {selectedEvent && (
            <View style={styles.eventDetails}>
              <Text style={styles.eventDetailsHeading}>Event Details</Text>
              <Text>{selectedEvent.name}</Text>
              <Text>{selectedEvent.description}</Text>
              <Text>{selectedEvent.start_time}</Text>
              <Button title="Save Event" onPress={handleSaveEvent} />
              <Button title="Back to Events" onPress={() => setSelectedEvent(null)} />
            </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dayButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  dayButton: {
    marginBottom: 8,
  },
  selectedDay: {
    fontSize: 18,
    marginTop: 16,
  },
  heading: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
  },
  eventOptions: {
    marginTop: 16,
  },
  eventOptionsHeading: {
    fontSize: 18,
  },
  eventOption: {
    marginBottom: 8,
  },
  eventDetails: {
    marginTop: 16,
  },
  eventDetailsHeading: {
    fontSize: 18,
  },
});

export default App;
