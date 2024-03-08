import { createTheme, responsiveFontSizes } from '@mui/material/styles'

/* const educationnextBlue = "#273568"
const educationnextDarkBlue = "#132a73"
const educationnextGreen = "#93c47d"
const educationnextDarkGreen = "#6c915c"

const educationnextLightGreen = "#dfffd8"
const educationnextCreativeGreen = "#c1df61"
const educationnextCreativeDarkGreen = "#7e923f"
const educationnextCreativeDarkBlue = "#42518a"
const educationnextCreativeLightGreen = "#edffcf" */

const iokBlue = "#363c56"
const iokBlue1 = "#8b7ca6"
const iokDarkBlue = "#3a5067"
const iokLightBlue = "#7892aa"

const iokAmber = "#fadd99"
const iokLightAmber = "#fde9d1"
const iokDarkAmber = "#a86236"

const iokWhite = "rgba(255, 255, 255, 0.87)"
const iokBlack ="rgba(0, 0, 0, 0.87)"

const iokInfo = "#526c84"

const iokCyan = "#48abb9"

const iokGrey = "#9e9e9e"
const iokLightGrey = "#cecece"
const iokBlueGrey = "#578392"

const colorPrimaryBackground = iokBlue
const colorPrimaryDark = iokDarkBlue
const colorPrimaryLight = iokLightBlue
const colorPrimaryText = iokWhite

const colorSecondaryBackground = iokAmber
/* const colorSecondaryDark = iokAmber */
const colorSecondaryLight = iokLightAmber
const colorSecondaryText = iokBlue

const colorInfoBackground = iokBlue //iokBlueGrey

const colorTextDisabled = iokGrey
const colorInfo = iokInfo

const colorBlack = iokBlack
const colorWhite = iokWhite
const colorGrey = iokGrey
const colorLightGrey = iokLightGrey


/* const colorDark = iokDarkBlue //iokAmber // iokDarkBlue
const colorDark2 = iokBlack //
const colorLight = iokDarkBlue //iokLightAmber //iokLightBlue //"#fff" //educationnextLightGreen
const colorDashboardDark = iokBlue //educationnextCreativeGreen
const colorDashboardCaption = iokBlue //educationnextDarkGreen */



let theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
		  main: colorPrimaryBackground,
		  dark: colorPrimaryDark,
		  light: colorPrimaryLight,
		  contrastText: colorPrimaryText,
		},
		secondary: {
		  main: colorSecondaryBackground, 
		  //dark: colorSecondaryDark, //unused??
		  light: colorSecondaryLight,		  
		  contrastText: colorSecondaryText,
		},
		info: {
		  main: colorInfo, // '#f18c4e',
		  //dark: colorDashboardDark,

		},
		text: {
			primary:colorWhite, //"rgba(0, 0, 0, 0.87)",
			secondary: colorBlack, //'#14475C',
			disabled: colorTextDisabled
		},
	},
	typography: {
		//fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontFamily: '"Spartan", sans-serif',
		fontSize: 13.5,
		
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		body1: {
			color: '#14475C',
			fontSize: "0.95rem"
		},
		h1: {
			fontSize: '2.8rem',
			fontWeight: 700,
			color: '#14475C',
		},
		h2: {
			fontSize: '1.7rem',
			fontWeight: 700,
			color: '#14475C',
		},	
		h6: {
			fontSize: '18px',
			fontWeight: 400,
		}

	},
	components: {
		MuiTooltip: {
		  styleOverrides: {
			tooltip: {
			  lineHeight: "1.2rem !important",
			  backgroundColor: "rgb(58, 80, 103, 0.8)",
			  marginTop: "5rem",
			}
		  }
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: colorWhite,
				},
		  },
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: colorWhite,
				},
		  },
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					color: colorBlack,
				},
		  },
		},

		MuiInputBase: {
			styleOverrides: {
				root: {
					fieldset: 
						{borderColor: colorWhite,
							},
					svg: {color: colorWhite},
					
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					borderColor: colorLightGrey,
					borderStyle: "solid",
					borderWidth: "0px",
					padding: "0.5rem",
					textArea: {
						color: colorBlack,
					}
				},
				},
			},
		MuiDrawer: {
			styleOverrides: {
				root: {paper: {backgroundColor: colorPrimaryBackground}},
					
			},
				},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					color: colorBlack,
				}
			}
		}
	}
})


theme.typography.h1 = {
	fontSize: '2.0rem',
	/*'@media (max-width:800px)': {
	  fontSize: '1.5rem',
	}, */

	[theme.breakpoints.up('xl')]: {
		fontSize: '2.8rem',
	  },
  }

  theme.typography.body1 = {
	fontSize: '0.8rem',
	/*'@media (max-width:800px)': {
	  fontSize: '1.5rem',
	}, */

	[theme.breakpoints.up('xl')]: {
		fontSize: '0.9rem',
	  },
  }

// theme = responsiveFontSizes(theme)

export default theme