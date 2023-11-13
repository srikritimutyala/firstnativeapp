import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'expo-dev-client';
import SignInScreen from './SiginInScreen';
//comment
//cbfekhebk
//982631072066-vbi3m08eksspjb2le2edpc1lr6k2u9nd.apps.googleusercontent.com    web
//982631072066-v4h7781kb6dlrhmd89i1hrb5f0utf4ka.apps.googleusercontent.com   ios
export default function App() {
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
