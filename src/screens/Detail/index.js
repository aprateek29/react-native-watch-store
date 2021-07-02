import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';

import styles from './style';
import {connect} from 'react-redux';
import {addToCart, getCartTotal} from '../../actions/action';
import {Image, Header, Text, Icon, Card} from 'react-native-elements';
import {COLORS, SIZES} from '../../constants';

const PropertyItem = ({property, value}) => {
  let flag = false;
  let year = 'yrs';
  if (!isNaN(value)) {
    flag = true;
    if (value < 2) {
      year = 'yr';
    }
  }
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <Card
        containerStyle={{
          width: 100,
          height: 80,
          borderRadius: 10,
          borderWidth: 0,
          elevation: 0,
        }}>
        <Card.Title>
          {value} {flag && year}
        </Card.Title>
        <Card.FeaturedSubtitle style={{color: '#999', textAlign: 'center'}}>
          {property}
        </Card.FeaturedSubtitle>
      </Card>
    </TouchableOpacity>
  );
};
const Detail = ({navigation, currentItem, addToCart, inCart, getCartTotal}) => {
  const data = [
    {property: 'Origin', value: currentItem[0].origin},
    {property: 'Warranty', value: currentItem[0].warranty},
    {property: 'Strap type', value: currentItem[0].strapType},
  ];

  const alreadyInCart = () => {
    ToastAndroid.show('Already in Cart', ToastAndroid.SHORT);
  };
  const added = () => {
    ToastAndroid.show('Added to Cart', ToastAndroid.SHORT);
  };

  const topBar = () => {
    return (
      <Header
        elevated={true}
        statusBarProps={{backgroundColor: COLORS.statusbar}}
        backgroundColor={COLORS.primary}
        barStyle="light-content"
        leftComponent={() => (
          <Icon
            containerStyle={{marginRight: 16}}
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
  const content = item => {
    const {id, name, price, image, brand, origin} = item[0];

    return (
      <View>
        <View style={styles.productImageWrapper}>
          <Image
            PlaceholderContent={<ActivityIndicator />}
            resizeMode="contain"
            style={{
              borderRadius: 10,
              width: 250,
              height: 250,
              borderWidth: 5,
              borderColor: '#fff',
            }}
            source={image}
          />
        </View>
        <View style={styles.productDetailsWrapper}>
          <Text h3 h3Style={{textTransform: 'capitalize'}}>
            {name}
          </Text>
          <Text h3>$ {price}</Text>
        </View>
        <Text style={{color: '#999', marginHorizontal: 10, marginTop: 20}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro
          blanditiis iure earum est iste!
        </Text>
        <FlatList
          style={{
            marginLeft: 4,
            marginTop: 10,
          }}
          horizontal
          data={data}
          renderItem={({item}) => {
            return <PropertyItem property={item.property} value={item.value} />;
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  };
  const bottomButtons = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 60,
        }}>
        {/* <TouchableNativeFeedback
          onPress={}>
        </TouchableNativeFeedback> */}
        <Icon
          onPress={() => {
            {
              inCart ? alreadyInCart() : added();
            }

            return addToCart(currentItem[0].id);
          }}
          containerStyle={{
            width: 45,
            height: 45,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
          }}
          iconStyle={{fontSize: 30}}
          reverse
          name="favorite"
          type="MaterialIcons"
          color={COLORS.primary}
        />
        <View
          style={{
            width: 250,
            backgroundColor: COLORS.primary,
            height: 40,
            marginTop: 10,
            marginRight: 20,
            borderRadius: 5,
          }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(COLORS.secondary, false)}
            onPress={() => {
              addToCart(currentItem[0].id);
              getCartTotal();
              return navigation.navigate('Grand');
            }}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                  lineHeight: 40,
                }}>
                Buy Now
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {topBar()}
        {content(currentItem)}
      </View>
      {bottomButtons()}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    currentItem: state.shopReducer.currentItem,
    inCart: state.shopReducer.inCart,
  };
};

export default connect(mapStateToProps, {addToCart, getCartTotal})(Detail);
