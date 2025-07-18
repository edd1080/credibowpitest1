// Componente molecular TabNavigation - navegación por tabs reutilizable
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TabOption, ApplicationStatus } from '../types';

interface TabNavigationProps {
  tabs: TabOption[];
  selectedTab: ApplicationStatus;
  onTabSelect: (tab: ApplicationStatus) => void;
  colors: {
    primary: string;
    textSecondary: string;
    textInverse: string;
    textTertiary: string;
  };
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  selectedTab,
  onTabSelect,
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
            onPress={() => onTabSelect(tab.key)}
            style={[
              styles.tab,
              selectedTab === tab.key && [styles.activeTab, { borderBottomColor: colors.primary }]
            ]}
          >
            <Text style={[
              styles.tabText,
              { color: selectedTab === tab.key ? colors.primary : colors.textSecondary },
              selectedTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
            {tab.count > 0 && (
              <View style={[
                styles.tabBadge,
                { 
                  backgroundColor: selectedTab === tab.key ? colors.primary : colors.textTertiary,
                }
              ]}>
                <Text style={[
                  styles.tabBadgeText,
                  { color: colors.textInverse }
                ]}>
                  {tab.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 8,
  },
  tabsScrollContent: {
    paddingHorizontal: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  activeTabText: {
    fontFamily: 'Inter-SemiBold',
  },
  tabBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
});