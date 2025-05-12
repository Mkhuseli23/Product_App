import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function DriverDashboard() {
  const [driverInfo, setDriverInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverInfo = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setDriverInfo([]);
          setLoading(false);
          return;
        }
        const q = query(collection(db, 'driverInfo'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setDriverInfo(data);
      } catch (error) {
        console.error('Error fetching driver info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007b8a" />
      </View>
    );
  }

  if (driverInfo.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No driver information found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {driverInfo.map((info) => (
        <View key={info.id} style={styles.infoBox}>
          <Text style={styles.title}>Driver Information</Text>
          <Text>Transporter Company Name: {info.transporter}</Text>
          <Text>Driver Name: {info.driver}</Text>
          <Text>Truck Registration: {info.truck}</Text>
          <Text>Purchase Order Number: {info.poNumber}</Text>
          <Text>Supplier Reference Number: {info.supplierRef}</Text>
          <Text>Loaded Volume: {info.loadedVolume}</Text>
          <Text>Loaded Date: {info.loadedDate}</Text>
          <Text>Delivery Site: {info.deliverySite}</Text>
          <Text>Delivered Volume: {info.deliveredVolume}</Text>
          <Text>Delivery Date: {info.deliveryDate}</Text>
          {info.loadingProof && (
            <>
              <Text>Bill of Lading:</Text>
              <Image source={{ uri: info.loadingProof }} style={styles.image} />
            </>
          )}
          {info.deliveryProof && (
            <>
              <Text>Proof of Delivery:</Text>
              <Image source={{ uri: info.deliveryProof }} style={styles.image} />
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8ff',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: '#dff1ff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    color: '#007b8a',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 6,
  },
});
