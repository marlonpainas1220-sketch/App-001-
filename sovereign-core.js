import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Conexão com o seu link do Supabase
    const fetchNoticias = async () => {
      try {
        const response = await fetch('https://rwqowtbeetzwrljrpdmh.supabase.co/rest/v1/noticias?select=*', {
          headers: {
            'apikey': 'SUA_ANON_KEY_AQUI', // VOCÊ PRECISA COLAR SUA CHAVE AQUI
            'Authorization': 'Bearer SUA_ANON_KEY_AQUI'
          }
        });
        const data = await response.json();
        setNoticias(data);
      } catch (e) { console.log(e); } finally { setLoading(false); }
    };
    fetchNoticias();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>NOTÍCIAS<Text style={{color: '#F9CF04'}}>PRIME</Text></Text>
      </View>
      {loading ? <ActivityIndicator size="large" color="#F9CF04" /> : (
        <FlatList 
          data={noticias} 
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imagem }} style={styles.image} />
              <View style={styles.content}>
                <View style={styles.badge}><Text style={styles.badgeText}>{item.categoria}</Text></View>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text style={styles.font}>{item.fonte}</Text>
              </View>
            </View>
          )} 
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' },
  logo: { fontSize: 24, fontWeight: '900' },
  card: { backgroundColor: '#fff', margin: 15, borderRadius: 15, elevation: 5, borderBottomWidth: 5, borderBottomColor: '#F9CF04' },
  image: { width: '100%', height: 200, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  content: { padding: 15 },
  badge: { backgroundColor: '#F9CF04', alignSelf: 'flex-start', padding: 5, borderRadius: 5, marginBottom: 10 },
  badgeText: { fontWeight: 'bold', fontSize: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  font: { fontSize: 11, color: '#999', marginTop: 10 }
});
