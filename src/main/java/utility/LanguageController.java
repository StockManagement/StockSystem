package utility;

import java.io.Serializable;
import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

@SessionScoped
@ManagedBean(name="language")
public class LanguageController implements Serializable {
	// Region -- private variables
	private static final long serialVersionUID = 1L;
	private Locale locale;
	// Endregion
	
	// Region -- getters and setters
	public Locale getLocale() {
		return locale;
	}
	
	public void setLocale(Locale locale) {
		this.locale = locale;
	}
	
	
	// Endregion
	
	@PostConstruct
	public void init() {
		locale = FacesContext.getCurrentInstance().getApplication().getDefaultLocale();
	}
	
	public void change(String lang){
		locale = new Locale(lang);
		FacesContext.getCurrentInstance().getViewRoot().setLocale(locale);
		
	}
}
