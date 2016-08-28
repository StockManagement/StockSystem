package home;


import java.io.Serializable;
import java.util.List;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.bean.SessionScoped;
import javax.faces.bean.ViewScoped;

@ViewScoped
@ManagedBean(name="home")
public class HomeController implements Serializable{
	private static final long serialVersionUID = 1L;
	private String name ;
	private String name2 ;
	
    
    // ------------------ getters and setters -------------------- //
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName2() {
		return name2;
	}
	public void setName2(String name) {
		this.name2 = name;
	}
	

	// ------------------ END getters and setters -------------------- //
	public void myAction(){
		System.out.println(name);
	}


	
	// ------------------ END getters and setters -------------------- //	
	
	
	// ------------------ methods ------------------------------ //
	

	

	// ------------------ END methods ------------------------------ //
	
	
	// ------------------ actions ------------------------------ //
	



		

	// ------------------ END actions ------------------------------ //
}