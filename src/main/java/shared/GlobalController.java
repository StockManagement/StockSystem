package shared;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.context.RequestContext;
import org.primefaces.event.CloseEvent;
import org.primefaces.event.MoveEvent;
import org.primefaces.event.SelectEvent;

@ManagedBean(name = "global")
@ViewScoped
public class GlobalController implements Serializable {

	// ------- Private Variables ------- //
	private static final long serialVersionUID = 1L;

	// load create add disc
	/***
	 * this function will help you to open a dialog from a java controller  
	 * @param event
	 */
	public String loadPage1() {
		Map<String, Object> options = new HashMap<String, Object>();
		options.put("modal", true);
		options.put("draggable", true);
		options.put("resizable", false);
		options.put("contentWidth", 500);
		options.put("widgetVar", "myDlg");
		options.put("closable", "false");
		options.put("headerElement", "customheader");
		// openDialog take the name of the view to be opened in a dialog and options for the dialog
		RequestContext.getCurrentInstance().openDialog("page1", options, null);
		return null;
	}


	/***
	 * this function will be called when a dialog closes
	 * @param event
	 */
	public void onDialogReturn(SelectEvent event) {
		Object rating = event.getObject();
//		FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, "You rated the book with " + rating, null);
//		FacesContext.getCurrentInstance().addMessage(null, message);

	}

	// ------- End Actions ------- //
}
