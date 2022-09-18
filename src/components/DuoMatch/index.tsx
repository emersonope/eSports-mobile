import { useState } from 'react';
import { Modal, ModalProps, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

    const [isCoping, setIscoping] = useState(false);

    async function handleCopyDiscorToClipBoard() {
        setIscoping(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert('Discord Copiado!', 'Usuário copiado para você procurar no discord!')
        setIscoping(false)
    };

    return (
        <Modal
            animationType="fade"
            statusBarTranslucent
            transparent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>

                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closingIcon}
                    >
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                    />

                    <Heading
                        title="Let's Play"
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione o seu discor
                    </Text>
                    <TouchableOpacity
                        disabled={isCoping}
                        onPress={handleCopyDiscorToClipBoard}
                        style={styles.discordButton}
                    >
                        <Text style={styles.discord}>
                            {isCoping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}