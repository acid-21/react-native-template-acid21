const primaryColor = 'rgb(65, 100, 74)';

const getTheme = (theme: any, isDarkMode: boolean, type: string) => {
  if (type === 'elements') {
    return {
      ...theme,
      lightColors: {
        ...theme.lightColors,
        primary: primaryColor,
      },
      darkColors: {
        ...theme.darkColors,
        primary: primaryColor,
      },
    };
  }
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: primaryColor,
    },
  };
};

export default getTheme;
