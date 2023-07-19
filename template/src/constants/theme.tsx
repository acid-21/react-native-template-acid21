const cardColor = 'rgb(28, 103, 88)';
const primaryColor = 'rgb(255, 96, 0)';

const getTheme = (theme: any, isDarkMode: boolean, type: string) => {
  if (type === 'elements') {
    return {
      ...theme,
      lightColors: {
        ...theme.lightColors,
        primary: primaryColor,
        card: cardColor,
      },
      darkColors: {
        ...theme.darkColors,
        primary: primaryColor,
        card: cardColor,
      },
    };
  }
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: primaryColor,
      card: cardColor,
      altText: 'white',
    },
  };
};

export default getTheme;
