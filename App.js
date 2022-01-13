import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { API_KEY } from "./apiKey";
import axios from "axios";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [success, setSuccess] = useState(true);
  const [days, setDays] = useState([]);
  const [city, setCity] = useState("Loding...");
  const [district, setDistrict] = useState("");
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setSuccess(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const userLocation = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    const district = userLocation[0].city || userLocation[0].district;
    const city = userLocation[0].region;
    // console.log(userLocation[0]);
    setCity(city);
    setDistrict(district);

    const response = await axios.request({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`,
    });
    // console.log(response.data.daily);
    setDays(response.data.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.district}>{district}</Text>
      </View>
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="black" size="large" />
          </View>
        ) : (
          days.map((day, index) => {
            const temp = parseFloat(day.temp.day).toFixed(1);
            return (
              <View key={index} style={styles.day}>
                <Text
                  // style={}
                  style={{
                    ...styles.temp,
                    color: temp < 0 ? "red" : temp === 0 ? "black" : "blue",
                  }}
                >
                  {temp}
                </Text>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.date}>
                  {new Date(day.dt * 1000).toString().substring(0, 10)}
                </Text>
              </View>
            );
          })
        )}
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
  },
  cityName: {
    fontSize: 40,
    fontWeight: "500",
  },
  district: {
    fontSize: 25,
    marginTop: 10,
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    fontSize: 100,
    marginTop: 50,
  },
  description: {
    fontSize: 35,
    marginTop: -20,
  },
  date: {
    fontSize: 15,
    fontWeight: "500",
  },
});
