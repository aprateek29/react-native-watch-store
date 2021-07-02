import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { Icon, Avatar, Header, Text, Button } from "react-native-elements";
import { COLORS } from "../../constants";
import { connect } from "react-redux";
import { clearData } from "../../actions/action";
import { db, storage, auth } from "../../../firebase";

const Profile = ({ navigation, clearData }) => {
  const signOutUser = () => {
    clearData();

    auth.signOut().then(() => {
      return navigation.replace("Login");
    });
  };

  const topBar = () => {
    return (
      <Header
        elevated={true}
        statusBarProps={{ backgroundColor: COLORS.statusbar }}
        backgroundColor={COLORS.primary}
        barStyle="light-content"
        centerComponent={{
          text: "Watchx",
          style: {
            color: "#fff",
            fontSize: 24,
          },
        }}
        rightComponent={() => (
          <Icon
            containerStyle={{ marginRight: 16 }}
            size={26}
            name="shopping-cart"
            type="font-awesome"
            color="#fff"
            onPress={() => navigation.navigate("Cart")}
          />
        )}
      />
    );
  };

  return (
    <View>
      {topBar()}
      <Text h2 h2Style={{ textAlign: "center", marginTop: 10 }}>
        Profile
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          buttonStyle={{
            marginTop: 100,
            width: 250,
            backgroundColor: COLORS.primary,
          }}
          onPress={signOutUser}
          title="Sign Out"
        />
      </View>
    </View>
  );
};

export default connect(null, { clearData })(Profile);

const styles = StyleSheet.create({});
