import { StatusBar } from 'expo-status-bar';
import 'expo-dev-client';
import SignInScreen from './SiginInScreen';
//comment
//cbfekhebk
//982631072066-vbi3m08eksspjb2le2edpc1lr6k2u9nd.apps.googleusercontent.com    web
//982631072066-v4h7781kb6dlrhmd89i1hrb5f0utf4ka.apps.googleusercontent.com   ios
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

//comment
//cbfekhebk

//test number 2

=======

export default function App() {
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const fetchEventsByLocation = async () => {
    const options = {
      method: 'GET',
      url: 'https://real-time-events-search.p.rapidapi.com/search-events',
      params: {
        query: location,
        start: '0'
      },
      headers: {
        'X-RapidAPI-Key': 'e2df6e46e9msh447cbb3b80c21d8p1120afjsn5b48a6dda562',
        'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com'
      }
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


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>text from srikritiititiitititii</Text>
      <SignInScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center' ,
    justifyContent: 'center',
  },
});
=======

      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, marginBottom: 16 }}>Find Events in Your Area</Text>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }}
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
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 18 }}>Event Details</Text>
              <Text>{selectedEvent.name}</Text>
              <Text>{selectedEvent.description}</Text>
              <Text>{selectedEvent.start_time}</Text>
              <Button title="Back to Events" onPress={() => setSelectedEvent(null)} />
            </View>
        )}
      </View>

  );
}
