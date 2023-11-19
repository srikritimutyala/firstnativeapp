import { StatusBar } from 'expo-status-bar';
import 'expo-dev-client';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { db } from './firebase.js';
import { doc, setDoc, getDoc } from "firebase/firestore";

//hello

const App = () => {
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);
  const [restaurantNames, setRestaurantNames] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEaterie, setSelectedEaterie] = useState(null);
  const [eaterieDisp,setEaterieDisp] = useState(false);
  const [eventDisp,setEventDisp] = useState(false);


  const [selectedDay, setSelectedDay] = useState(null);
  const [stateAPI, setStateAPI] = useState('');
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
        'X-RapidAPI-Key': '1b2e449e86msh2692ba531c172c6p1ef238jsne3e2ebd3f018',
        'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options);
      setEvents(response.data.data);
      setSelectedEvent(null); // Reset selectedEvent when fetching new events
    } catch (error) {
      console.error(error);
    }

    const options2 = {
      method: 'GET',
      url: `https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/${stateAPI}/city/${location}/0`,
      headers: {
        'X-RapidAPI-Key': '4c94e54b36msh2e46fe55239a053p1b3468jsn7657bf0a0982',
        'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
      }
    };
    
    try {
      const response2 = await axios.request(options2);
      console.log(response2.data);
      const data = response2.data;
      console.log(data.restaurants[0].restaurantName+"cnrekvbkireie")
      // Extract restaurant names from the API response using a for loop
      const restaurantData = [];
      for (let i = 0; i < data.restaurants.length; i++) {
        console.log(data.restaurants[i].restaurantName)
        restaurantData.push(data.restaurants[i])
      }

      setRestaurantNames(restaurantData);
    } catch (error) {
      console.error(error);
    }

    console.log("ginished the fetchingk")





  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEventDisp(true);

  };

  const handleEaterieClick = (event) => {
    setSelectedEaterie(event);
    setEaterieDisp(true);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleSaveEvent = async () => {
    console.log("runnign in save event")
    if (selectedEvent && selectedDay) {
      console.log("asjfgbsldkjg")
      const eventRef = doc(db, 'events', selectedDay);
      const eateriesRef = doc(db, 'eateries', selectedDay);
      const eventDoc = await getDoc(eventRef);
      const eaterieDoc = await getDoc(eateriesRef);


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
    // if (selectedEaterie && selectedDay) {
    //   const eateriesRef = doc(db, 'eateries', selectedDay);
    //   const eaterieDoc = await getDoc(eateriesRef);

    //   if (eaterieDoc.exists()) {
    //     // If the document exists, update the events array
    //     await setDoc(eateriesRef, { restaurantNames: [...eaterieDoc.data().eateries, selectedEaterie] }, { merge: true });
    //   } else {
    //     // If the document doesn't exist, create a new one with the events array
    //     await setDoc(eateriesRef, { restaurantNames: [selectedEaterie] });
    //   }


    //   selectedEaterie(null);
    // }


  };


  const handleEaterieEvent = async () => {
    console.log("running in finctioj point")
    if (selectedEaterie && selectedDay) {
      console.log("running in if statement b point")
      const eateriesRef = doc(db, 'eateries', selectedDay);
      const eaterieDoc = await getDoc(eateriesRef);

      if (eaterieDoc.exists()) {
        // If the document exists, update the events array
        await setDoc(eateriesRef, { restaurantNames: [...eaterieDoc.data().restaurantNames, selectedEaterie] }, { merge: true });
      } else {
        // If the document doesn't exist, create a new one with the events array
        await setDoc(eateriesRef, { restaurantNames: [selectedEaterie] });
      }


      setSelectedEaterie(null);
      console.log("running null point")
    }
  }

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
            placeholder="Enter City"
            value={location}
            onChangeText={(text) => setLocation(text)}
        />
         <TextInput
            style={styles.input}
            placeholder="Enter State"
            value={stateAPI}
            onChangeText={(text) => setStateAPI(text)}
           
        />
        <Button title="Search Events" onPress={fetchEventsByLocation} />

        {events.length > 0 && selectedEvent==null && !eaterieDisp &&(
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
        {restaurantNames.length > 0 && selectedEaterie==null&&  !eventDisp &&(
            <View>
              <Text style={{ fontSize: 18, marginTop: 16 }}>Event Options in {location}</Text>
              <FlatList
                  data={restaurantNames}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleEaterieClick(item)}>
                        <View style={{ marginBottom: 8 }}>
                          <Text>{item.restaurantName}</Text>
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
              <Button
  title="Save Event"
  onPress={() => {
    setEventDisp(false);
    handleSaveEvent();
  }}
/>

             <Button title="Back to Events"   onPress={() => {
    selectedEvent(null);
    setEventDisp(false);
  }} />
            </View>
        )}

        {selectedEaterie && (
            
            <View style={styles.eventDetails}>
              <Text style={styles.eventDetailsHeading}>Eaterie Details</Text>
              <Text>{selectedEaterie.restaurantName}</Text>
              <Text>Address: {selectedEaterie.address}</Text>
              <Text>Phone number: {selectedEaterie.phone}</Text>
              <Text>Website: {selectedEaterie.website}</Text>
              <Text>Hours: {selectedEaterie.hoursInterval}</Text>
              <Text>Cuisine: {selectedEaterie.cuisineType}</Text>
              




             
              <Button
  title="Save Event"
  onPress={() => {
    setEaterieDisp(false);
    handleEaterieEvent();
  }}
/>

             <Button title="Back to Events"   onPress={() => {
    setSelectedEaterie(null);
    setEaterieDisp(false);
  }} />
            </View>
            
        )
        
        
        }


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
