package utility;
/***
 * useful link: https://www.mkyong.com/webservices/jax-rs/restfull-java-client-with-java-net-url/
 */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import java.net.MalformedURLException;

public class Communicator {
	public static final String JSON = "application/json";
	public static final String XML = "application/xml";

	/***
	 * send a get to a rest to a url
	 * 
	 * @param urlString
	 * @param restBaseUrl
	 *            is an @optional parameter for a base rest service url
	 */
	public static String get(String urlString, String restBaseUrl, String type) {
		String result = "";
		try {
			// check type
			if (type == null || (!type.equals(JSON) && !type.equals(XML))) {
				System.err.println("type not recognized");
				return result;
			}
			// check base url
			restBaseUrl = (restBaseUrl != null && restBaseUrl.length() > 0) ? restBaseUrl
					: Helper.getConfig("REST_SERVICE_BASE_URL");

			// create rest connection
			URL url = new URL(restBaseUrl + urlString);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", type);

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
			String output;

			while ((output = br.readLine()) != null) {
				result += output;
			}
			conn.disconnect();
			return result;
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/***
	 * 
	 * @param urlString
	 * @param jsonObj
	 *            is a json string that contains the plain text values this
	 *            function do
	 */
	 public static void post(String urlString, String jsonStr) {
	 try {
	 
	
	 // "http://localhost:8080/RESTfulExample/json/product/post"
	 URL url = new URL(urlString);
	 HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	 conn.setDoOutput(true);
	 conn.setRequestMethod("POST");
	 conn.setRequestProperty("Content-Type", "application/json");
	 String input = jsonStr; //request.toString(); // "{\"qty\":100,\"name\":\"iPad4\"}";
	
	 // craete outputStream
	 OutputStream os = conn.getOutputStream();
	 os.write(input.getBytes());
	 os.flush();
	
	 if (conn.getResponseCode() == 500) {
	 throw new RuntimeException("Failed: error on server: 500");
	 }
	
	 if (conn.getResponseCode() != 200) {
	 throw new RuntimeException("Failed : HTTP error code : " +
	 conn.getResponseCode());
	 }
	 BufferedReader br = new BufferedReader(new
	 InputStreamReader((conn.getInputStream())));
	 String output;
	 System.out.println("Output from Server .... \n");
	 while ((output = br.readLine()) != null) {
	 System.out.println(output);
	 }
	 conn.disconnect();
	
	 } catch (Exception e) {
	 e.printStackTrace();
	 }
	 }

	public static void main(java.lang.String[] args) {
		String usersRestUrl = Helper.getConfig("REST_USER_URL");
		String usersJson = Communicator.get(usersRestUrl , "", Communicator.JSON);
		
		Gson gson = new Gson();
		List<Map> user = gson.fromJson(usersJson, List.class);
	}

}
