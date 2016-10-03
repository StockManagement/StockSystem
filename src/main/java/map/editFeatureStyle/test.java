package map.editFeatureStyle;

import java.util.List;

import utility.Helper;

public class test {
	public static void main(String[] args){
		String type = "testFolder" +  "/";
		String path = Helper.getConfig("SymbolImagesPhysicalPath") ;
		String serverPath = Helper.getConfig("SymbolImagesDirectoryPath") ;
		List<String> folders = Helper.recurseDir(path, "");
		List<String> symbols = Helper.recurseDir(path + type, serverPath + type);
		String s = "";
	}
	
}
