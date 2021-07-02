import React from "react";
import {
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import { removeFromCart, getCartTotal } from "../../actions/action";
import { back, like } from "../../constants/icons";
import { Image, Header, Text, Icon, Card, Button } from "react-native-elements";
import { COLORS, SIZES } from "../../constants";

const Cart = ({ cartItems, navigation, removeFromCart, getCartTotal }) => {
  const displayCartItems = () => {
    return (
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              onPress={() => navigation.navigate("Detail", item.id)}
            >
              <View style={styles.cartItem}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={item.image}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginTop: 5,
                    }}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text h4 h4Style={{ textTransform: "capitalize" }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontStyle: "italic",
                        textTransform: "capitalize",
                      }}
                    >
                      by {item.brand}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text h4 h4Style={styles.cartItemPrice}>
                    {item.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      removeFromCart(item.id);
                      return getCartTotal();
                    }}
                  >
                    <Icon
                      name="delete"
                      type="MaterialCommunityIcons"
                      size={30}
                      color="#323232"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableNativeFeedback>
          )}
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
            containerStyle={{ marginRight: 16 }}
            size={26}
            name="arrow-back"
            type="MaterialIcons"
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        )}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {topBar()}
      <View style={{ flex: 1 }}>
        {cartItems.length < 1 ? (
          <View>
            <Text
              h4
              h4Style={{ textAlign: "center", color: "#999", marginTop: 100 }}
            >
              Cart is empty
            </Text>
            <Button
              buttonStyle={{
                backgroundColor: COLORS.primary,
                width: 200,
                alignSelf: "center",
                marginTop: 50,
              }}
              onPress={() => navigation.navigate("Home")}
              title="Go To Home"
            />
          </View>
        ) : (
          <View style={{ marginHorizontal: 10, flex: 1 }}>
            <Text
              h2
              h2Style={{ textAlign: "center", marginTop: 10, marginBottom: 30 }}
            >
              Cart
            </Text>

            {displayCartItems()}
          </View>
        )}
      </View>
      {cartItems.length > 0 && (
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
              width: 250,
              backgroundColor: COLORS.primary,
              alignSelf: "center",
              borderRadius: 50,
            }}
          >
            <TouchableNativeFeedback
              onPress={() => {
                getCartTotal();
                return navigation.navigate("Grand");
              }}
            >
              <Text
                h4
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "bold",
                  lineHeight: 50,
                  height: 50,
                  textAlign: "center",
                  width: 250,
                }}
              >
                Checkout
              </Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.shopReducer.cartItems,
  };
};

export default connect(mapStateToProps, { removeFromCart, getCartTotal })(Cart);
