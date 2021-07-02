import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";

import { Header, Button } from "react-native-elements";
import { COLORS } from "../../constants";
import { clearData } from "../../actions/action";
import { connect } from "react-redux";

const Success = ({ navigation, clearData }) => {
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
      />
    );
  };

  const customOnPress = () => {
    navigation.navigate("Home");
    clearData();
  };

  return (
    <View>
      {topBar()}
      <Text style={styles.text}>Payment Success</Text>
      <Button
        buttonStyle={{
          backgroundColor: COLORS.primary,
          width: 200,
          alignSelf: "center",
        }}
        title="Back To Home"
        onPress={customOnPress}
      />
    </View>
  );
};

export default connect(null, { clearData })(Success);

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    marginTop: 50,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
  },
});
