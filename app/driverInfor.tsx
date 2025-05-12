import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, TextInput } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function FormScreen() {
  const [form, setForm] = useState({
    transporter: '',
    driver: '',
    truck: '',
    poNumber: '',
    supplierRef: '',
    loadedVolume: '',
    loadedDate: '',
    deliverySite: '',
    deliveredVolume: '',
    deliveryDate: ''
  });

  const [loadingProof, setLoadingProof] = useState<string | null>(null);
  const [deliveryProof, setDeliveryProof] = useState<string | null>(null);

  const pickImage = async (setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'You must be logged in to submit data');
        return;
      }
      await addDoc(collection(db, 'driverInfo'), {
        uid: user.uid,
        ...form,
        loadingProof,
        deliveryProof,
        timestamp: new Date()
      });
      Alert.alert('Success', 'Driver information submitted successfully');
      setForm({
        transporter: '',
        driver: '',
        truck: '',
        poNumber: '',
        supplierRef: '',
        loadedVolume: '',
        loadedDate: '',
        deliverySite: '',
        deliveredVolume: '',
        deliveryDate: ''
      });
      setLoadingProof(null);
      setDeliveryProof(null);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to submit data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {[
        ['Transporter Company Name', 'transporter'],
        ['Driver Name', 'driver'],
        ['Truck Registration', 'truck'],
        ['Purchase Order Number', 'poNumber'],
        ['Supplier Reference Number', 'supplierRef'],
        ['Loaded Volume', 'loadedVolume'],
        ['Loaded Date', 'loadedDate'],
        ['Delivery Site', 'deliverySite'],
        ['Delivered Volume', 'deliveredVolume'],
        ['Delivery Date', 'deliveryDate'],
      ].map(([label, key]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={label}
          value={form[key as keyof typeof form]}
          onChangeText={(text) => setForm({ ...form, [key]: text })}
        />
      ))}

      <Button title="Upload Bill of Lading" onPress={() => pickImage(setLoadingProof)} />
      {loadingProof && <Image source={{ uri: loadingProof }} style={styles.image} />}

      <Button title="Upload Proof of Delivery" onPress={() => pickImage(setDeliveryProof)} />
      {deliveryProof && <Image source={{ uri: deliveryProof }} style={styles.image} />}

      <Button title="Submit" onPress={handleSubmit} color="#246071" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
  image: { width: '100%', height: 200, marginVertical: 10 }
});
