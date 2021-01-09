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
  background: "#f1f1f2"
};

/**
 * 文字颜色
 */
export const FontColor = {
  white: "#fff"
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
