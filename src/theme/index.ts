/**
 * 主题颜色
 */
export const ThemeColor = {
  primary: "#409EFF",
  success: "#67C23A",
  warning: "#E6A23C",
  danger: "#F56C6C",
  info: "#909399",
  orange: "#FF6A00",
  white: "#FFFFFF",
  background: "#F1F1F2"
};

/**
 * 文字颜色
 */
export const FontColor = {
  white: "#fff",
  default: "#303133"
};

/**
 * AppBar样式
 */
export function AppBarStyle() {
  const appBarStyle = {
    background: "#fff"
  };
  const menuIconStyle = {
    background: ThemeColor.orange
  };
  const logoStyle = {
    color: ThemeColor.orange
  };
  return {
    appBarStyle,
    menuIconStyle,
    logoStyle
  };
}

/**
 * 边栏样式
 */
export function SidebarStyle() {
  const scrollbarStyle = {
    background: ThemeColor.white
  };
  const sidebarBackgroundColor = ThemeColor.white;
  const sidebarTextColor = FontColor.default;
  const sidebarActiveTextColor = ThemeColor.orange;
  return {
    scrollbarStyle,
    sidebarBackgroundColor,
    sidebarTextColor,
    sidebarActiveTextColor
  };
}
