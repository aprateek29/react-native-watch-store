import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cartItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    marginBottom: 5,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemOrigin: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#999',
  },
  cartItemPrice: {
    fontSize: 18,
    fontStyle: 'italic',
    marginRight: 20,
  },
  deleteIcon: {
    marginRight: 10,
  },
  itemWrapper: {
    marginTop: 10,
    height: 500,
  },
});
