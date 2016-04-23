package shared;

import java.io.IOException;
import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;

@RequestScoped
@ManagedBean(name="redirect")
public class RedirectController implements Serializable{
	private static final long serialVersionUID = 1L;
	
	public String getNavClass(String page){
		return FacesContext.getCurrentInstance().getViewRoot().getViewId().endsWith(page)? "active": null;
	}
	
	public void toPage1(){
		try {
			ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
			context.redirect(context.getRequestContextPath() + "/pages/page1/page1.xhtml");
		} catch (IOException e) {
			e.printStackTrace();
		} 
	}
	
	

	
}
