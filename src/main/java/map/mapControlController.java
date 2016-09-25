package map;
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
	
	public static void main(String[] args){
		System.out.println("hello");
		String usersJsonStr = Communicator.get("userlocations" , "http://localhost:8081/stRestService/rest/", Communicator.JSON);
		
		Gson gson = new Gson();
		List<Map> users = gson.fromJson(usersJsonStr, List.class);
	}

}
