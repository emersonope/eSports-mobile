import React from 'react';
import { View } from 'react-native';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
    id: string,
    hourEnd: string,
    hourStart: string,
    name: string,
    useVoiceChannel: boolean,
    weekDays: string[],
    yearsPlaying: number,
}

interface Props {
    data: DuoCardProps;
}

export function DuoCard() {
  return (
    <View style={styles.container}>

       <DuoInfo
        label="Nome"
        value="Diego Fernandes"
      />
      {/*
      <DuoInfo
        label="Tempo de Jogo"
        value={`${data.yearsPlaying} anos`}
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias`}
      />
      <DuoInfo
        label="Nome"
        value="Diego Fernandes"
      />
      <DuoInfo
        label="Nome"
        value="Diego Fernandes"
      /> */}

    </View>
  );
}