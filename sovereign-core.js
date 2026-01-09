import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, FlatList, Image, 
  TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator 
} from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [noticias, setNoticias] = useState([]);

  // SIMULAÇÃO DA AUTOMAÇÃO (Depois conectamos ao seu Banco de Dados)
  useEffect(() => {
    const dadosFicticios = [
      {
        id: '1',
        titulo: '🚨 EXCLUSIVO: Influenciador famoso é flagrado em Fernando de Noronha com novo affair!',
        imagem: 'https://images.unsplash.com/photo-1510706019500-d23a509eecd4?w=800',
        categoria: 'FAMOSOS',
        fonte: 'Fonte: Portal Alfinetei'
      },
      {
        id: '2',
        titulo: 'VAI DAR O QUE FALAR! Participante de Reality solta o verbo sobre bastidores polêmicos.',
        imagem: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800',
        categoria: 'REALITY',
        fonte: 'Fonte: Hugo Gloss'
      }
    ];
    
    setNoticias(dadosFicticios);
    setLoading(false);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <Image source={{ uri: item.image || item.imagem }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.categoria}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardSource}>{item.fonte}</Text>
          <TouchableOpacity style={styles.btnShare}>
            <Text style={styles.btnShareText}>Compartilhar 🔥</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header Estilo Portal */}
      <View style={styles.header}>
        <Text style={styles.logo}>NOTÍCIAS<Text style={styles.logoYellow}>PRIME</Text></Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#F9CF04" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={noticias}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    paddingVertical: 15, 
    backgroundColor: '#FFFFFF', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEEEEE' 
  },
  logo: { fontSize: 24, fontWeight: '900', color: '#000000', letterSpacing: -1 },
  logoYellow: { color: '#F9CF04' },
  
  card: { 
    backgroundColor: '#FFFFFF', 
    marginHorizontal: 15, 
    marginTop: 20, 
    borderRadius: 15,
    // Sombra para dar aspecto "descolado"
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderBottomWidth: 4,
    borderBottomColor: '#F9CF04'
  },
  cardImage: { width: '100%', height: 220, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  cardContent: { padding: 15 },
  badge: { 
    backgroundColor: '#F9CF04', 
    paddingHorizontal: 10, 
    paddingVertical: 3, 
    borderRadius: 5, 
    marginBottom: 10, 
    alignSelf: 'flex-start' 
  },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: '#000' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', lineHeight: 22 },
  cardFooter: { 
    marginTop: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  cardSource: { fontSize: 11, color: '#999999', fontStyle: 'italic' },
  btnShare: { backgroundColor: '#F9CF04', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnShareText: { fontSize: 12, fontWeight: 'bold', color: '#000' }
});
