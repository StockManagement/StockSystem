package map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import com.google.gson.Gson;

import models.User;
import utility.Communicator;
import utility.Helper;

@ViewScoped
@ManagedBean(name="mapControl")
public class mapControlController {
	String usersJsonStr;
	List<Map> users;
	// -------------------------- getters and setters ----------------------- //
	public List<Map> getUsers() {
		return users;
	}
	public void setUsers(List<Map> users) {
		this.users = users;
	}
	
	public String getUsersJsonStr() {
		return usersJsonStr;
	}
	public void setUsersJsonStr(String usersJsonStr) {
		this.usersJsonStr = usersJsonStr;
	}
	// ------------------------ END getters and setters ----------------------- //
	

	@PostConstruct
	void init(){
		String usersRestUrl = Helper.getConfig("REST_USER_LOCATION_URL");
		usersJsonStr = Communicator.get(usersRestUrl , "", Communicator.JSON);
		
		Gson gson = new Gson();
		users = gson.fromJson(usersJsonStr, List.class);
	}

}
