package map.user;

import java.time.LocalDateTime;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import com.google.gson.JsonObject;
import utility.Communicator;
import utility.Helper;



@RequestScoped
@ManagedBean(name="sidePanelUserControl")
public class sidePanelUserControl{
	private String username;
	private String phoneNumber;
	private String selectedSymbol;
	private String userPositionX;
	private String userPositionY;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	public String getSelectedSymbol() {
		return selectedSymbol;
	}
	public void setSelectedSymbol(String selectedSymbol) {
		this.selectedSymbol = selectedSymbol;
	}
	
	public String getUserPositionX() {
		return userPositionX;
	}
	public void setUserPositionX(String userPositionX) {
		this.userPositionX = userPositionX;
	}
	
	public String getUserPositionY() {
		return userPositionY;
	}
	public void setUserPositionY(String userPositionY) {
		this.userPositionY = userPositionY;
	}
	
	
	public void cancel(){
		username = "";
		phoneNumber = "";
	}
	
	public void save(){
		if(username==null || username.length()==0) return;
		JsonObject json = new JsonObject();
		json.addProperty("userName", username);
		json.addProperty("phoneNumber", phoneNumber);
		json.addProperty("createdAt", LocalDateTime.now().toString());
		json.addProperty("updatedAt", LocalDateTime.now().toString());
		
		if(userPositionX.length() > 0 && userPositionY.length() > 0){
			json.addProperty("x", userPositionX);
			json.addProperty("y", userPositionY);
			json.addProperty("img", selectedSymbol);
		}
		
		String usersUrl = Helper.getConfig("REST_ADD_USER_LOCATION");
		String usersRestUrl = Helper.getConfig("REST_SERVICE_BASE_URL");
		Communicator.post(usersRestUrl + usersUrl , json.toString());
		
	}
	
}