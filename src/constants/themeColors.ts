export const colors = {
  light: {
    primaryBackground: 'bg-light-primary-background',
    secondaryBackground: 'bg-light-secondary-background',
    primaryText: 'text-light-primary-text',
    secondaryText: 'text-light-secondary-text',
    bordersDividers: 'border-light-borders-dividers',

    primaryAccent: 'bg-light-primary-accent text-white',
    primaryAccentHover: 'bg-light-primary-accent-hover text-white',
    secondaryAccent: 'bg-light-secondary-accent text-white',
    success: 'bg-light-success text-white',
    errorDanger: 'bg-light-error-danger text-white',
    buttonText: 'text-light-button-text',
    outlinedButtonBorder: 'border-light-primary-accent text-light-primary-text hover:shadow-lg hover:shadow-blue-gray-500/50 transition-shadow duration-300',
  },
  dark: {
    primaryBackground: 'bg-dark-primary-background',
    secondaryBackground: 'bg-dark-secondary-background',
    primaryText: 'text-dark-primary-text',
    secondaryText: 'text-dark-secondary-text',
    bordersDividers: 'border-dark-borders-dividers',

    primaryAccent: 'bg-dark-primary-accent text-black',
    primaryAccentHover: 'bg-dark-primary-accent-hover text-black',
    secondaryAccent: 'bg-dark-secondary-accent text-white',
    success: 'bg-dark-success text-white',
    errorDanger: 'bg-dark-error-danger text-white',
    buttonText: 'text-dark-button-text',
    outlinedButtonBorder: 'border-dark-borders-dividers text-dark-primary-text hover:shadow-lg hover:shadow-gray-900/50 transition-shadow duration-300', // Исправлено text-light-primary-text на text-dark-primary-text
  }
};

export const headerColors = {
  light: {
    background: 'bg-[#002C54]',
    text: 'text-white',
    logoText: 'text-[#FFD700]',
    inputBg: 'bg-white',
    inputText: 'text-[#1F2937]',
    inputBorder: 'border-gray-300',
    inputPlaceholder: 'placeholder-gray-500',

    buttonBorder: 'border-[#3B506B]',
    buttonText: 'text-light-primary-text',
    buttonHoverBg: 'hover:bg-[#3B506B]',
    buttonHoverText: 'hover:text-[#FFD700]',

    cartBadgeBg: 'bg-[#EF5350]',
    cartBadgeText: 'text-white',
    toggleActiveBg: 'bg-white',
    toggleActiveText: 'text-[#002C54] hover:text-white',
    toggleInactiveBg: 'bg-transparent',
    toggleInactiveText: 'text-white',
  },
  dark: {
    background: 'bg-[#002C54]',
    text: 'text-[#E0E6EB]',
    logoText: 'text-[#FFD700]',
    inputBg: 'bg-[#233850]',
    inputText: 'text-[#E0E6EB]',
    inputBorder: 'border-[#3B506B]',
    inputPlaceholder: 'placeholder-[#AABAC8]',

    buttonBorder: 'border-[#3B506B]',
    buttonText: 'text-light-primary-text',
    buttonHoverBg: 'hover:bg-[#3B506B]',
    buttonHoverText: 'hover:text-[#FFD700]',

    cartBadgeBg: 'bg-[#EF5350]',
    cartBadgeText: 'text-white',
    toggleActiveBg: 'bg-[#FFD700]',
    toggleActiveText: 'text-black hover:text-white',
    toggleInactiveBg: 'bg-transparent',
    toggleInactiveText: 'text-[#E0E6EB]',
  }
};

export const footerColors = {
  light: {
    background: 'bg-[#002C54]',
    text: 'text-white',
    logoText: 'text-[#FFD700]',
    linkHover: 'hover:text-gray-400',
    divider: 'border-gray-700',
  },
  dark: {
    background: 'bg-[#002C54]',
    text: 'text-[#E0E6EB]', 
    logoText: 'text-[#FFD700]',
    linkHover: 'hover:text-[#AABAC8]',
    divider: 'border-[#3B506B]',
  }
};