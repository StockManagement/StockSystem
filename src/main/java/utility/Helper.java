package utility;

import java.io.InputStream;
import java.util.Locale;
import java.util.Properties;

import javax.faces.context.FacesContext;

public class Helper {
	
	// Get the Resource Value by Key
//	public static String getResource(String key) {
//		return new Text().getResource(key);
//	}
	
//	// Set application current locale
//	public static void setCurrentLocale(String language) {
//		Locale locale = new Locale(language);
//		ELContext elContext = FacesContext.getCurrentInstance().getELContext();
//		LanguageController languageController = (LanguageController) FacesContext.getCurrentInstance().getApplication().getELResolver()
//				.getValue(elContext, null, "language");
//		languageController.setLocale(locale);
//	}
	
//	// Get application current locale
//	public static String findCurrentLocale() {
//		ELContext elContext = FacesContext.getCurrentInstance().getELContext();
//		LanguageController languageController = (LanguageController) FacesContext.getCurrentInstance().getApplication().getELResolver()
//				.getValue(elContext, null, "language");
//		return languageController.getLocale().toString();
//	}
	
	// Get the Configuration Parameter Value by Key
	public static String getConfig(String key) {
		try {
			Properties prop = new Properties();
			String propFile = "/com/tahaki/resource/config.properties";
			InputStream inputStream = Helper.class.getResourceAsStream(propFile);
			prop.load(inputStream);
			if (inputStream == null) {
				return key;
			}
			return prop.getProperty(key).toString();
		} catch (Exception e) {
			return key;
		}
	}
}
