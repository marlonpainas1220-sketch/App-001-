import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Aqui o App busca as notícias que o Robô salvou
  useEffect(() => {
    fetch('URL_DO_SEU_BANCO_DE_DADOS_AQUI')
      .then(res => res.json())
      .then(data => {
        setNoticias(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const renderNoticia = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.badge}><Text style={styles.badgeText}>{item.categoria}</Text></View>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.font}>Fonte: {item.fonte}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ler fofoca completa 🔥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>FOFOCA<Text style={{color: '#F9CF04'}}>PRIME</Text></Text>
      </View>
      {loading ? <ActivityIndicator size="large" color="#F9CF04" /> : (
        <FlatList data={noticias} renderItem={renderNoticia} keyExtractor={item => item.id} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' },
  logo: { fontSize: 26, fontWeight: '900', letterSpacing: -1 },
  card: { backgroundColor: '#fff', margin: 15, borderRadius: 15, elevation: 5, borderBottomWidth: 4, borderBottomColor: '#F9CF04' },
  image: { width: '100%', height: 200, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  content: { padding: 15 },
  badge: { backgroundColor: '#F9CF04', alignSelf: 'flex-start', paddingHorizontal: 10, borderRadius: 5, marginBottom: 10 },
  badgeText: { fontWeight: 'bold', fontSize: 12 },
  title: { fontSize: 18, fontWeight: 'bold', lineHeight: 22 },
  font: { fontSize: 11, color: '#999', marginTop: 10, fontStyle: 'italic' },
  button: { backgroundColor: '#F9CF04', marginTop: 15, padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { fontWeight: 'bold' }
});
