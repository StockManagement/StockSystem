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
@ManagedBean(name = "mapControl")
public class mapControlController {

    List<Map> clients;
    List<Map> users;
    List<Map> landmarks;
    String usersJsonStr;
    String clientsJsonStr;
    String landmarksJsonStr;
    String defaultServerPath;
    String imgDefaultClient;
    String imgDefaultUser;
    String imgDefaultlandmark;

    // -------------------------- getters and setters ----------------------- //
    public void setClients(List<Map> clients) {
        this.clients = clients;
    }

    public List<Map> getClients() {
        return clients;
    }

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

    public String getClientsJsonStr() {
        return clientsJsonStr;
    }

    public void setClientsJsonStr(String clientsJsonStr) {
        this.clientsJsonStr = clientsJsonStr;
    }

    public List<Map> getLandmarks() {
        return landmarks;
    }

    public void setLandmarks(List<Map> landmarks) {
        this.landmarks = landmarks;
    }

    public String getLandmarksJsonStr() {
        return landmarksJsonStr;
    }

    public void setLandmarksJsonStr(String landmarksJsonStr) {
        this.landmarksJsonStr = landmarksJsonStr;
    }

    public String getDefaultServerPath() {

        return Helper.getConfig("DefaultServerPath");
    }

    public String getImgDefaultClient() {
        return Helper.getConfig("DefaultServerPath").concat("resources/img/images/default-client.png");
    }

    public String getImgDefaultUser() {
        return Helper.getConfig("DefaultServerPath").concat("resources/img/images/default-user.png");
    }

    public String getUserTrackingRestUrl() {

        return Helper.getConfig("REST_SERVICE_BASE_URL").concat(Helper.getConfig("REST_USER_TRACKING"));

    }

    // ------------------------ END getters and setters -----------------------
    // //
    @PostConstruct
    void init() {
        //Getusers
        String usersRestUrl = Helper.getConfig("REST_USER_LOCATION_URL");
        // used to Add users on the map
        usersJsonStr = Communicator.get(usersRestUrl, "", Communicator.JSON);
        //url to Getclients
        String clientsRestUrl = Helper.getConfig("REST_CLIENT_LOCATION_URL");
        // used to Add Clients on the map
        clientsJsonStr = Communicator.get(clientsRestUrl, "", Communicator.JSON);
        //url to GetLandMarks
        String landmarksRestUrl = Helper.getConfig("REST_Landmarks_URL");
        landmarksJsonStr = Communicator.get(landmarksRestUrl, "", Communicator.JSON);

        Gson gson = new Gson();
        clients = gson.fromJson(clientsJsonStr, List.class);
        users = gson.fromJson(usersJsonStr, List.class);
        landmarks = gson.fromJson(landmarksJsonStr, List.class);

    }

    public static void main(String[] args) {
        System.out.println("hello");
        String usersJsonStr = Communicator.get("userlocations", "http://localhost:8080/stRestService/rest/",
                Communicator.JSON);

        Gson gson = new Gson();
        List<Map> users = gson.fromJson(usersJsonStr, List.class);
    }

    public String getImgDefaultlandmark() {
        return Helper.getConfig("DefaultServerPath").concat("resources/img/landmarks/landmark-default.png");
    }

    
}
