import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from "react-native";
import {
  Avatar,
  Header,
  Button,
  Input,
  Image,
  Icon,
  Text,
} from "react-native-elements";
import { COLORS } from "../../constants";
import { db, storage, auth } from "../../../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const primary_color = COLORS.primary;
  const secondary_color = COLORS.secondary;

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return () => unsubscribe();
  }, []);

  const signIn = () => {
    setLoading(true);

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setLoading(false);
      return alert(error);
    });
  };

  const topBar = () => {
    return (
      <Header
        elevated={true}
        statusBarProps={{ backgroundColor: COLORS.statusbar }}
        backgroundColor={COLORS.primary}
        barStyle="light-content"
        leftComponent={() => (
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("Profile")}
          >
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
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

  return (
    <View style={{ flex: 1 }}>
      {topBar()}
      <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
        <View
          style={{
            width: 210,
            height: 210,
            marginBottom: 10,
            backgroundColor: "green",
            borderRadius: 105,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            elevation: 10,
            borderColor: "#ddd",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              // elevation: 10,
            }}
          >
            <Image
              source={require("../../assets/images/watch-one.jpg")}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Input
            inputStyle={{}}
            placeholder="Email"
            autoFocus
            type="email"
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
        </View>
        <Button
          raised
          buttonStyle={{ backgroundColor: primary_color }}
          onPress={signIn}
          containerStyle={styles.button}
          title="Login"
        />
        <Button
          raised
          titleStyle={{ color: "#000" }}
          buttonStyle={{ borderColor: secondary_color }}
          onPress={() => navigation.navigate("Register")}
          containerStyle={styles.button}
          type="outline"
          title="Register"
        />
        {loading && (
          <View style={{ marginTop: 50 }}>
            <ActivityIndicator size="small" color={primary_color} />
          </View>
        )}
        <View style={{ height: 50 }} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
