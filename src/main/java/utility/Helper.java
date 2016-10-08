package utility;

import java.io.File;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
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
	
	// ----------- get all files under directory ---------- //
		public static List<String> recurseDir(String dir, String serverPath) {
			String result, _result[];
			result = recurseInDirFrom(dir, serverPath);
			_result = result.split("\\|");
			return Arrays.asList(_result);
		}

		private static String recurseInDirFrom(String dirItem, String serverPath) {
			File file;
			String list[], result;
			result = dirItem;
			file = new File(dirItem);
			if (file.isDirectory()) {
				result = "";
				list = file.list();
				// recursive call
				for (int i = 0; i < list.length; i++){
					if(list[i].startsWith(".")) continue;
					result = (result == "" ? "" : result + "|") + recurseInDirFrom(serverPath + list[i], "");
				}
			}
			return result;
		}
		// ----------- END get all files under directory ---------- //

}
