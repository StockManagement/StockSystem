package utility;

import java.io.InputStream;
import java.util.Locale;
import java.util.Properties;

import javax.faces.context.FacesContext;

public class Helper {

	// Get the Configuration Parameter Value by Key
	public static String getConfig(String key) {
		try {
			Properties prop = new Properties();
			String propFile = "../config/config.properties";

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
