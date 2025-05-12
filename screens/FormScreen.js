import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, TextInput } from 'react-native';

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

  const [loadingProof, setLoadingProof] = useState(null);
  const [deliveryProof, setDeliveryProof] = useState(null);

  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting:', form);
    // Here you would POST the data + images to your API or Firebase
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
          value={form[key]}
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
