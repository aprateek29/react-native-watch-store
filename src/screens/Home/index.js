import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import { loadCurrentBrand, loadCurrentItem } from "../../actions/action";

import { COLORS, SIZES } from "../../constants";
import {
  Header,
  Avatar,
  Text,
  Icon,
  Card,
  Button,
} from "react-native-elements";
import { db, storage, auth } from "../../../firebase";

const BrandListItem = ({
  navigation,
  id,
  name,
  origin,
  image,
  loadCurrentBrand,
}) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        loadCurrentBrand(id);
        return navigation.navigate("Company");
      }}
    >
      <Card
        containerStyle={{
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 20,
          borderWidth: 0,
          paddingRight: 50,
        }}
        wrapperStyle={{ flexDirection: "row", elevation: 0, border: 0 }}
      >
        <Card.Image
          resizeMode="contain"
          style={{ borderRadius: 16, width: 60, height: 60 }}
          source={image}
        />
        <View style={{ marginLeft: 10 }}>
          <Card.FeaturedTitle style={{ color: "#000" }}>
            {name}
          </Card.FeaturedTitle>
          <Card.FeaturedSubtitle style={styles.brandOrigin}>
            {origin}
          </Card.FeaturedSubtitle>
        </View>
      </Card>
    </TouchableNativeFeedback>
  );
};

const ListItem = ({
  id,
  name,
  image,
  brand,
  price,
  navigation,
  loadCurrentItem,
}) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        loadCurrentItem(id);
        navigation.navigate("Detail", { id });
      }}
    >
      <Card
        containerStyle={{
          marginBottom: 5,
          marginRight: 10,
          elevation: 0,
          margin: 0,
          backgroundColor: "#fff",
          borderRadius: 20,
          width: (SIZES.width - 20) / 2,
          borderWidth: 0,
        }}
      >
        <Card.Image
          source={image}
          style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
        />
        <Card.FeaturedTitle
          style={{ fontSize: 24, color: COLORS.statusbar, marginTop: 5 }}
        >
          $ {price}
        </Card.FeaturedTitle>
        <Card.FeaturedSubtitle
          style={{ color: "#333", textTransform: "capitalize" }}
        >
          {name}
        </Card.FeaturedSubtitle>
        <Text style={{ textAlign: "left", textTransform: "capitalize" }}>
          from {brand}
        </Text>
      </Card>
    </TouchableNativeFeedback>
  );
};

const Home = ({
  products,
  brands,
  navigation,
  loadCurrentItem,
  loadCurrentBrand,
}) => {
  const data = products;

  const topBar = () => {
    return (
      <Header
        elevated={true}
        statusBarProps={{ backgroundColor: COLORS.statusbar }}
        backgroundColor={COLORS.primary}
        barStyle="light-content"
        leftComponent={() => (
          <TouchableNativeFeedback
            style={{ backgroundColor: "#dedede" }}
            onPress={() => navigation.navigate("Profile")}
          >
            <Avatar rounded icon={{ name: "user", type: "font-awesome" }} />
          </TouchableNativeFeedback>
        )}
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

  const content = () => {
    return (
      <View style={styles.content}>
        <Text
          h2
          h2Style={{ fontStyle: "italic", marginVertical: 10, marginLeft: 10 }}
        >
          Trending
        </Text>
        <FlatList
          columnWrapperStyle={{
            padding: 5,
          }}
          ListFooterComponent={<PopularBrands />}
          numColumns={2}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              id={item.id}
              name={item.name}
              brand={item.brand}
              price={item.price}
              image={item.image}
              navigation={navigation}
              loadCurrentItem={loadCurrentItem}
            />
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  };
  const PopularBrands = () => {
    return (
      <View>
        <Text
          h2
          h2Style={{ fontStyle: "italic", marginBottom: 10, marginLeft: 10 }}
        >
          Popular Brands
        </Text>
        <FlatList
          horizontal
          data={brands}
          renderItem={({ item }) => (
            <BrandListItem
              name={item.name}
              origin={item.origin}
              image={item.image}
              navigation={navigation}
              id={item.id}
              loadCurrentBrand={loadCurrentBrand}
            />
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {topBar()}
      {/* <ScrollView nestedScrollEnabled>
      </ScrollView> */}
      <View style={{ flex: 1 }}>
        {content()}
        {/* {popularBrands()} */}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.shopReducer.products,
    brands: state.shopReducer.brands,
  };
};

export default connect(mapStateToProps, {
  loadCurrentBrand,
  loadCurrentItem,
})(Home);
