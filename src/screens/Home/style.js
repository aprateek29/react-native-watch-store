import { StyleSheet } from "react-native";

export default StyleSheet.create({
  topBar: {
    height: 60,
    justifyContent: "space-between",
    backgroundColor: "#e63946",
    elevation: 24,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#333",
    flexDirection: "row",
    alignItems: "center",
  },
  cartIconContainer: {
    width: 40,
    height: 40,
    margin: 10,
    padding: 7,
  },
  cartIcon: {
    height: 26,
    width: 26,
  },
  content: { marginTop: 16, marginBottom: 16, flex: 1 },
  contentHeader: {
    height: 50,
    marginBottom: 8,
  },
  brandTileWrapper: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: "#fff",
  },

  brandTile: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 220,
    height: 70,
    borderRadius: 12,
    paddingLeft: 10,
    alignItems: "center",
  },
  brandName: {
    // color: '#333',
    // fontWeight: 'bold',
    // fontSize: 16,
  },
  brandOrigin: {
    color: "#999",
  },
});
