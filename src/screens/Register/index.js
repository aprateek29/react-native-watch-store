import React from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { Button, Input, Text, Header } from "react-native-elements";
import CustomImagePicker from "../components/CustomImagePicker";
import { COLORS } from "../../constants";
import { db, storage, auth } from "../../../firebase";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const primary_color = COLORS.primary;
  const secondary_color = COLORS.secondary;

  const uploadImage = async () => {
    const uri = image;
    const childPath = `profileImages/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = storage.ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        register(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
      setLoading(false);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const register = (profileImage) => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          // photoURL: profileImage || "https://via.placeholder.com/200",
          photoURL: "https://via.placeholder.com/200",
        });
      })
      .catch((err) => {
        setLoading(false);
        return alert(err.message);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        backgroundColor={COLORS.primary}
        barStyle="light-content"
        statusBarProps={{ backgroundColor: COLORS.statusbar }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Text h3 style={{ marginBottom: 50 }}>
            Create an account
          </Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Full Name *"
              type="text"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder="Email *"
              type="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              placeholder="Password *"
              type="password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View
            style={{
              width: 150,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <CustomImagePicker image={image} setImage={setImage} /> */}
          </View>
          <Button
            buttonStyle={{ backgroundColor: primary_color }}
            containerStyle={styles.button}
            raised
            onPress={register}
            title="Register"
            disabled={name === "" || email === "" || password === ""}
          />
          {loading && (
            <View style={{ marginTop: 50 }}>
              <ActivityIndicator size="small" color={primary_color} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
