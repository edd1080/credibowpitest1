// Componente molecular ApplicationDetailHeader - header de navegación para detalles de solicitud
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ArrowLeft, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

interface ApplicationDetailHeaderProps {
  title: string;
  subtitle: string;
  onBackPress: () => void;
  onMenuPress: () => void;
  colors: {
    background: string;
    border: string;
    text: string;
    textSecondary: string;
  };
}

export const ApplicationDetailHeader: React.FC<ApplicationDetailHeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  onMenuPress,
  colors
}) => {
  return (
    <View style={[styles.navigationHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <ArrowLeft size={24} color={colors.text} />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <MoreHorizontal size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 2,
  },
  menuButton: {
    padding: 4,
  },
});