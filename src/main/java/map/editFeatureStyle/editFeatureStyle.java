package map.editFeatureStyle;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import utility.Helper;

@ViewScoped
@ManagedBean(name="editFeatureStyle")
public class editFeatureStyle {
	private String path;
	
	private String selectedSymbolType ;
	private List<String> symbols;
	private List<String> folders;
	
	
	public String getSelectedSymbolType() {
		return selectedSymbolType;
	}
	public void setSelectedSymbolType(String selectedSymbolType) {
		this.selectedSymbolType = selectedSymbolType;
	}

	public List<String> getSymbols() {
		return symbols;
	}
	public void setSymbols(List<String> symbols) {
		this.symbols = symbols;
	}
	
	public List<String> getFolders() {
		return folders;
	}
	public void setFolders(List<String> folders) {
		this.folders = folders;
	}
	
	@PostConstruct
	public void init(){
		path = Helper.getConfig("SymbolImagesPhysicalPath") ;
		folders = Helper.recurseDir(path, "");
		if(folders!=null && folders.size() > 0 && selectedSymbolType == null)
			selectedSymbolType = folders.get(0); 
		getIconPerType();
	}
	
	public void getIconPerType(){
		String serverPath = Helper.getConfig("SymbolImagesDirectoryPath") + selectedSymbolType +  "/";
		symbols = Helper.recurseDir(path + selectedSymbolType, serverPath);
	}
	

}
