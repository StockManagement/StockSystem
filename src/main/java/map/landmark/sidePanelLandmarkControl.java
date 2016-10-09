package map.landmark;


import java.time.LocalDateTime;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import com.google.gson.JsonObject;
import utility.Communicator;
import utility.Helper;

@RequestScoped
@ManagedBean(name="sidePanelLandmarkControl")
public class sidePanelLandmarkControl{
	private String tag;
	private String typeId;
	private String name;
	private String description;
	private String selectedSymbol;
	private String landmarkPositionX;
	private String landmarkPositionY;
	
	public String getSelectedSymbol() {
		return selectedSymbol;
	}
	public void setSelectedSymbol(String selectedSymbol) {
		this.selectedSymbol = selectedSymbol;
	}
	
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	
	public String getTypeId() {
		return typeId;
	}
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getLandmarkPositionX() {
		return landmarkPositionX;
	}
	public void setLandmarkPositionX(String landmarkPositionX) {
		this.landmarkPositionX = landmarkPositionX;
	}
	
	public String getLandmarkPositionY() {
		return landmarkPositionY;
	}
	public void setLandmarkPositionY(String landmarkPositionY) {
		this.landmarkPositionY = landmarkPositionY;
	}
	
	public void cancel(){
		tag = "";
		typeId = "";
		name = "";
		description = "";
		selectedSymbol = "";
	}
	
	public void save(){
		// do not add a landmark without (x,y)		
		if(landmarkPositionX==null || landmarkPositionX.length()==0 || landmarkPositionY==null || landmarkPositionY.length()==0) return;
		
		JsonObject json = new JsonObject();
		json.addProperty("x", landmarkPositionX);
		json.addProperty("y", landmarkPositionY);
		json.addProperty("name", name);
		json.addProperty("img", selectedSymbol);
		json.addProperty("tag", tag);
		json.addProperty("typeId", typeId);
		json.addProperty("description", description);
		json.addProperty("createdAt", LocalDateTime.now().toString());
		json.addProperty("updatedAt", LocalDateTime.now().toString());
		
		String landmarkUrl = Helper.getConfig("REST_ADD_LANDMARK");
		String baseServiceUrl = Helper.getConfig("REST_SERVICE_BASE_URL");
		Communicator.post(baseServiceUrl + landmarkUrl , json.toString());
		
		// reset values
		cancel();
	}
	
}