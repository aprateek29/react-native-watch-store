import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  TouchableNativeFeedback,
} from "react-native";
import { connect } from "react-redux";
import { Image, Header, Text, Icon, Card } from "react-native-elements";
import { COLORS, SIZES } from "../../constants";

const Grand = ({ cartItems, cartTotal, navigation }) => {
  const showToast = () => {
    navigation.navigate("Success");
  };

  const displayTotal = () => {
    return (
      <View style={styles.itemWrapper}>
        <FlatList
          ListHeaderComponent={
            <Text h1 h1Style={styles.grand}>
              Grand Total
            </Text>
          }
          ListFooterComponent={
            <View>
              <View style={styles.totalWrapper}>
                <Text h3 h3Style={styles.totalTag}>
                  Total
                </Text>
                <Text h3 h3Style={styles.total}>
                  $ {cartTotal}
                </Text>
              </View>
            </View>
          }
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemName}>
                {item.name} <Text style={styles.origin}>by {item.brand}</Text>
              </Text>
              <Text style={styles.itemPrice}>$ {item.price}</Text>
            </View>
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  };
  const topBar = () => {
    return (
      <Header
        elevated={true}
        statusBarProps={{ backgroundColor: COLORS.statusbar }}
        backgroundColor={COLORS.primary}
        barStyle="light-content"
        leftComponent={() => (
          <Icon
            size={26}
            name="arrow-back"
            type="MaterialIcons"
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        )}
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
    <View style={{ flex: 1 }}>
      {topBar()}
      <View style={{ marginHorizontal: 10, flex: 1 }}>{displayTotal()}</View>
      <View
        style={{
          height: 60,
          backgroundColor: "#fff",
          borderTopColor: "#ddd",
          borderTopWidth: 1,
        }}
      >
        <View
          style={{
            marginTop: 5,
            height: 50,
            width: 280,
            backgroundColor: COLORS.primary,
            alignSelf: "center",
            borderRadius: 50,
          }}
        >
          <TouchableNativeFeedback onPress={showToast}>
            <Text
              h4
              style={{
                color: "#fff",
                fontSize: 20,
                lineHeight: 50,
                height: 50,
                textAlign: "center",
                width: 280,
              }}
            >
              Proceed To Payment
            </Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.shopReducer.cartItems,
    cartTotal: state.shopReducer.cartTotal,
  };
};

export default connect(mapStateToProps)(Grand);

const styles = StyleSheet.create({
  topBar: {
    height: 60,
    alignItems: "flex-start",
  },
  backIconContainer: {
    width: 40,
    height: 40,
    margin: 10,
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 40 / 2,
    elevation: 4,
    shadowColor: "#333",
    shadowOffset: { width: 5, height: 5 },
  },
  backIcon: {
    height: 26,
    width: 26,
  },
  grand: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemName: {
    fontSize: 20,
    textTransform: "capitalize",
  },
  itemPrice: {
    fontSize: 20,
  },
  origin: {
    textTransform: "capitalize",
    fontSize: 14,
    fontStyle: "italic",
    color: "#999",
    paddingLeft: 10,
  },
  totalWrapper: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  totalTag: {
    fontSize: 20,
    fontWeight: "bold",
  },
  total: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
