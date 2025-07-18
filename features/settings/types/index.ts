// Settings feature types
export interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

export interface SettingsSection {
  title: string;
  items: SettingItemProps[];
}