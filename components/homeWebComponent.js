import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

export default function HomeWebComp() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcome}>
        <Text style={{ fontSize: 28 }}>Bine ai venit, Adrian 👋</Text>
      </View>
      <View style={styles.top}>
        <View style={styles.top_camera}>
          <Text>Camera</Text>
          <Text>4</Text>
        </View>
        <View style={styles.top_camere}>
          <Text>Mai sunt disponibile</Text>
          <Text>100/200 camere</Text>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={{ alignSelf: "flex-start", fontSize: 28 }}>
          Anunturi importante!
        </Text>
        <FlatList
          data={data} // Datele listei
          renderItem={renderItem} // Funcția pentru a randează fiecare element
          keyExtractor={(item) => item.id} // Extrage un identificator unic pentru fiecare element
          style={styles.flatListContainer} // Adaugarea stilurilor la FlatList direct
          initialNumToRender={2}
        />
      </View>
      <View>
        <Text>lorem</Text>
      </View>
    </ScrollView>
  );
}
