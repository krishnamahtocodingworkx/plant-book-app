import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/screenWrapper";
import { commonStyles } from "../style";
import { Image } from "expo-image";
import colors from "../../utils/style";
import OutlinedButton from "../../components/buttons/OutlinedButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/slices/authThunk";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../routes/Navigation";

const ProfileScreen = () => {
  const email = useSelector((state: RootState) => state.auth.userDetails?.email)
  const dispatch: AppDispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const images = [
    "https://i.pinimg.com/736x/b9/f4/6f/b9f46fdb253ad697c573892332403d7e.jpg",
    "https://i.pinimg.com/736x/38/f4/95/38f49514a075755c8ac7d1bc848bd9fc.jpg",
    "https://i.pinimg.com/736x/f1/8f/20/f18f2023b950d14b64a6f7388ca93608.jpg",
    "https://i.pinimg.com/736x/45/57/a4/4557a48a8311719691489a862859ccf5.jpg",
    "https://i.pinimg.com/736x/d0/28/17/d028174d9c366ce45d82d2ff09c0c6d5.jpg",
    "https://i.pinimg.com/736x/8e/9b/de/8e9bde20bcde174b98bb3a84213d2fca.jpg",
  ];
  const logoutHandler = () => {
    dispatch(logoutThunk({ email: email || "" })).unwrap().then((res) => {
      console.log("Logout Response :", res);
      navigation.navigate("Login");
    });
  }
  return (
    // <ScreenWrapper scroll={true} avoidKeyboard={false}>
    <ScrollView style={{ flex: 1 }}>
      <Image source={images[5]} style={styles.bannerImage} />
      <View style={styles.container}>
        <Image source={images[1]} style={styles.profileImage} />
        <View style={{ alignItems: "center", gap: 5 }}>
          <Text style={commonStyles.heading}>Anushka Shrestha</Text>
          <Text style={commonStyles.bio}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
            quasi.
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsItems}>
            <Text style={styles.statsText}>96</Text>
            <Text style={styles.statsSubText}>Posts</Text>
          </View>
          <View style={styles.statsItems}>
            <Text style={styles.statsText}>110</Text>
            <Text style={styles.statsSubText}>Followers</Text>
          </View>
          <View style={styles.statsItems}>
            <Text style={styles.statsText}>210</Text>
            <Text style={styles.statsSubText}>Following</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 10,
            // justifyContent: "space-between",
          }}
        >
          <OutlinedButton
            title="Message"
            onPress={() => console.log("Cancelled")}
          />
          <PrimaryButton
            title="Follow"
            onPress={logoutHandler}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            width: "100%",
          }}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginVertical: 5,
              }}
            />
          ))}
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginVertical: 5,
              }}
            />
          ))}
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginVertical: 5,
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
    // </ScreenWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 140,
    gap: 18,
  },
  bannerImage: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
    resizeMode: "cover",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    resizeMode: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  statsItems: { flex: 1, alignItems: "center", gap: 1 },
  statsText: { fontSize: 20, fontWeight: "700" },
  statsSubText: {
    fontSize: 10,
    color: colors.darkGrey,
  },
});
