/**
 * 主题颜色
 */
export const ThemeColor = {
  primary: "#409EFF",
  success: "#67C23A",
  warning: "#E6A23C",
  danger: "#F56C6C",
  info: "#909399",
  white: "#FFFFFF",
  background: "#F1F1F2"
};

/**
 * 文字颜色
 */
export const FontColor = {
  white: "#fff",
  default: "#303133",
  loginTitle: "#181818",
  gray: "#999"
};

/**
 * AppBar样式
 */
export function AppBarStyle() {
  const appBarStyle = {
    background: "#fff"
  };
  const menuIconStyle = {
    background: ThemeColor.primary
  };
  const logoStyle = {
    color: ThemeColor.primary
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
  const sidebarActiveTextColor = ThemeColor.primary;
  return {
    scrollbarStyle,
    sidebarBackgroundColor,
    sidebarTextColor,
    sidebarActiveTextColor
  };
}

/**
 * 登录颜色样式
 */
export function LoginColorStyle() {
  return {
    topbarTitleLeft: {
      color: ThemeColor.primary
    },
    topbarTitleRight: {
      color: FontColor.loginTitle
    },
    content: {
      backgroundColor: ThemeColor.white
    },
    otherLogin: {
      color: FontColor.gray
    }
  };
}
