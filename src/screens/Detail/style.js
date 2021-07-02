import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  productImageWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  productDetailsWrapper: {
    marginTop: 40,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productDesc: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    lineHeight: 20,
  },

  bottomButtonsWrapper: {
    height: 50,
    flexDirection: 'row',
  },
});
