import * as React from "react";
import { Component } from "react";
import { Text, View, StyleSheet, ToastAndroid } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: String;
  showCancel?: Boolean;
}

export default function Header({ title, showCancel = true }: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={25} color="#15b6d6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>

      {showCancel === true ? (
        <BorderlessButton
          onPress={() => {
            ToastAndroid.show("Redirecionado para página inicial", 1000);
            navigation.navigate("OrphanagesMap");
          }}
        >
          <Feather name="x" size={25} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fafc",
    borderBottomWidth: 1,
    borderColor: "#dde3f0",
    paddingTop: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  title: {
    fontFamily: "Nunito_600SemiBold",
    color: "#8fa7b3",
    fontSize: 16,
  },
});
