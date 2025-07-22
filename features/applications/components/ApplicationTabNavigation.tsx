// Componente molecular ApplicationTabNavigation - navegación por tabs específica para detalles de solicitud
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TabType } from '../types';

interface Tab {
  key: TabType;
  label: string;
}

interface ApplicationTabNavigationProps {
  tabs: Tab[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  colors: {
    primary: string;
    textSecondary: string;
    textInverse: string;
  };
}

export const ApplicationTabNavigation: React.FC<ApplicationTabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  colors
}) => {
  return (
    <View style={styles.tabsContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsScrollContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            style={[
              styles.tab,
              activeTab === tab.key && [styles.activeTab, { backgroundColor: colors.primary }]
            ]}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === tab.key ? colors.textInverse : colors.textSecondary },
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  tabsScrollContent: {
    gap: 6,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: '#F1F5F9',
  },
  activeTab: {
    backgroundColor: '#1976D2',
  },
  tabText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '600',
  },
});