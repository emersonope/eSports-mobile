import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';

import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuosSelected, setDiscordDuosSelected] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoback() {
    navigation.goBack();
  }

  function getDiscorUser(adsId: string) {
    fetch(`http://192.168.15.7:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuosSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.15.7:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  })

  return (
    <Background>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoback}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              SIZE={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscorUser(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              N??o h?? an??ncios publicados para esse jogo!
            </Text>

          )}
        />

        <DuoMatch  
          visible={discordDuosSelected.length > 0}
          discord={discordDuosSelected}
          onClose={() => setDiscordDuosSelected('')}
        />

      </SafeAreaView>
    </Background>
  );
}