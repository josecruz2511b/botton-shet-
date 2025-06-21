import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function App() {
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Memoizar los snapPoints
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
    setIsOpen(true);
  }, []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsOpen(false);
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    setIsOpen(index !== -1);
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Demo Bottom Sheet</Text>
          <Text style={styles.status}>
            Estado: {isOpen ? "Abierto" : "Cerrado"}
          </Text>
          <Button title="Abrir Bottom Sheet" onPress={handleOpenSheet} />

          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onChange={handleSheetChanges}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.handleIndicator}
          >
            <BottomSheetView style={styles.sheetContent}>
              <Text style={styles.sheetText}>¡Bottom Sheet funcionando!</Text>
              <Text style={styles.sheetSubText}>
                Puedes arrastrar hacia arriba para expandir más
              </Text>
              <View style={styles.buttonContainer}>
                <Button title="Cerrar" onPress={handleCloseSheet} />
              </View>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  sheetContent: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  sheetText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  sheetSubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  bottomSheetBackground: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  handleIndicator: {
    backgroundColor: "#d1d5db",
    width: 40,
  },
});
