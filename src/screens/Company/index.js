import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Image, Header, Text, Icon, Card} from 'react-native-elements';
import {COLORS, SIZES} from '../../constants';

const Company = ({navigation, currentBrand}) => {
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
  const content = () => {
    return (
      <View style={{marginHorizontal: 10}}>
        <View style={styles.productImageWrapper}>
          <Image
            source={currentBrand.image}
            style={{
              width: 250,
              height: 250,
              borderRadius: 20,
              borderColor: '#fff',
              borderWidth: 5,
            }}
          />
        </View>
        <Text style={styles.name}>{currentBrand.name}</Text>
        <Text style={styles.origin}>{currentBrand.origin}</Text>
        <Text style={styles.companyDesc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro
          blanditiis iure earum est iste!
        </Text>
      </View>
    );
  };
  return (
    <ScrollView>
      {topBar()}
      {content()}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    currentBrand: state.shopReducer.currentBrand,
  };
};

export default connect(mapStateToProps, null)(Company);

const styles = StyleSheet.create({
  productImageWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginVertical: 20,
  },
  origin: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#777',
  },
  companyDesc: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaa',
    marginBottom: 16,
    lineHeight: 20,
  },
});
