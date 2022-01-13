import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, Text, View, ScrollView } from "react-native";
// import {  } from "react-native-web";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>DaeJeon</Text>
      </View>
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>36</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>36</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>36</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>36</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>36</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>36</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="dark"></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c5f6fa",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "500",
  },
  weather: {
    // flex: ,
    backgroundColor: "green",
  },
  day: {
    width: SCREEN_WIDTH,
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "teal",
  },
  temp: {
    fontSize: 100,
    marginTop: 50,
  },
  description: {
    fontSize: 50,
    marginTop: -20,
  },
});
