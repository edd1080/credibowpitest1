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
    marginBottom: 6,
    paddingHorizontal: 16,
  },
  tabsScrollContent: {
    paddingHorizontal: 0,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '600',
  },
  tabBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9999,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    fontWeight: '500',
  },
});