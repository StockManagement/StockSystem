
import com.google.gson.Gson;
import java.io.FileReader;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import utility.Communicator;
import utility.Helper;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ajaafar
 */
public class test {
    
    public static void main(java.lang.String[] args) {
		try {
			Properties prop = new Properties();
                     FileReader reader= new FileReader("src//main//java//config//config.properties");
			String propFile = "";

			InputStream inputStream = Helper.class.getResourceAsStream(propFile);
			prop.load(reader);
			if (inputStream == null) {
				
			}
			
		} catch (Exception e) {
			
		}
	}
}
