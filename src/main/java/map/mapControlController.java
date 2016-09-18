package map;
import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import utility.Helper;

@ViewScoped
@ManagedBean(name="mapControl")
public class mapControlController {
	String usersJson = "{a: b}";
	
	// -------------------------- getters and setters ----------------------- //
	public String getUsersJson() {
		return usersJson;
	}
	public void setUsersJson(String usersJson) {
		this.usersJson = usersJson;
	}
	// ------------------------ END getters and setters ----------------------- //
	
	@PostConstruct
	void init(){
		System.out.println("initializing mapControlController");
		String usersRestUrl = Helper.getConfig("REST_USER_URL");
		System.out.println(usersRestUrl);
//		Communicator.get(usersRestUrl, null);
	}




}
