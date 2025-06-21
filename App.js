import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Demo Bottom Sheet</Text>
          <Button title="Abrir Bottom Sheet" onPress={handleOpenSheet} />

          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
          >
            <View style={styles.sheetContent}>
              <Text style={styles.sheetText}>Este es el contenido del Bottom Sheet</Text>
            </View>
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  sheetText: {
    fontSize: 18,
    color: '#333',
  },
});
